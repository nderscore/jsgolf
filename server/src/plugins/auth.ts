import type { FastifyInstance } from 'fastify';
import oauthPlugin, { OAuth2Namespace } from 'fastify-oauth2';
import fastifyCookie from 'fastify-cookie';
import fastifySession from '@mgcrea/fastify-session';
import fetch from 'node-fetch';

import { config } from '../constants/config';
import { prisma } from '../lib/prisma';
import { PrismaSessionStore } from '../lib/PrismaSessionStore';

declare module 'fastify' {
  interface FastifyInstance {
    githubOAuth2: OAuth2Namespace;
  }
}

declare module '@mgcrea/fastify-session' {
  interface SessionData {
    userId: string;
  }
}

const startRedirectPath = '/login/github';
const callbackPath = `${startRedirectPath}/callback`;
const logoutPath = '/logout';

const sessionStore = new PrismaSessionStore({ prisma });

export const setupAuth = (app: FastifyInstance) => {
  app.register(fastifyCookie);

  app.register(fastifySession, {
    secret: config.SESSION_SECRET,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store: sessionStore as any,
    saveUninitialized: false,
    cookie: {
      secure: false, // FIXME: set secure here in prod?
      maxAge: 14 * 24 * 60 * 60, // 14 days (seconds)
    },
  });

  app.register(oauthPlugin, {
    name: 'githubOAuth2',
    scope: [],
    credentials: {
      client: {
        id: config.GITHUB_CLIENTID,
        secret: config.GITHUB_SECRET,
      },
      auth: oauthPlugin.GITHUB_CONFIGURATION,
    },
    startRedirectPath,
    callbackUri: config.BASE_URL + callbackPath,
  });

  app.get(callbackPath, (request, reply) => {
    app.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(
      request,
      async (err, result) => {
        if (err) {
          reply.send(err);
          return;
        }

        const token = result.access_token;

        try {
          const profileResult = await fetch('https://api.github.com/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const json = (await profileResult.json()) as {
            id: number;
            login: string;
          };

          const { id: githubId, login: username } = json;

          if (!githubId) {
            throw new Error();
          }

          let newUser = false;
          let user = await prisma.user.findUnique({
            where: { githubId },
          });

          if (!user) {
            newUser = true;
            user = await prisma.user.create({
              data: {
                githubId,
                username,
                roles: [],
              },
            });
          }

          request.session.set('userId', user.id);

          reply.send(`Logged in.${newUser ? ' New User.' : ''}`);
          // FIXME: Redirect?
        } catch (e) {
          reply.send('Auth failure.');
        }
      },
    );
  });

  app.get(logoutPath, (request, reply) => {
    request.session.destroy();
    reply.send('Logged out.');
    // FIXME: Redirect?
  });
};
