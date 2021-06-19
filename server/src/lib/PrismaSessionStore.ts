import { PrismaClient } from '.prisma/client';
import { SessionData, SessionStore } from '@mgcrea/fastify-session';
import { EventEmitter } from 'events';

export const DEFAULT_EXPIRY_PERIOD = 15 * 60e3; // 15 minutes

export type PrismaSessionStoreOptiopns = {
  prisma: PrismaClient;
  expiryPeriod?: number;
};

export class PrismaSessionStore<T extends SessionData = SessionData>
  extends EventEmitter
  implements SessionStore
{
  private readonly prisma: PrismaClient;

  constructor({
    prisma,
    expiryPeriod = DEFAULT_EXPIRY_PERIOD,
  }: PrismaSessionStoreOptiopns) {
    super();

    this.prisma = prisma;

    setInterval(() => this.flushExpired(), expiryPeriod);
  }

  private flushExpired() {
    const now = new Date();

    this.prisma.session.deleteMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });
  }

  private async upsertSession(
    sessionId: string,
    expiry?: number | null,
    sessionData?: T,
  ) {
    const expiresAt = new Date(expiry || Date.now());
    const data = (
      sessionData !== undefined ? JSON.stringify(sessionData) : undefined
    ) as string;

    const existingSession = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });

    let result;

    if (existingSession) {
      result = await this.prisma.session.update({
        where: { id: sessionId },
        data: {
          expiresAt,
          data,
        },
      });
    } else {
      result = await this.prisma.session.create({
        data: {
          id: sessionId,
          expiresAt,
          data: data || '{}',
        },
      });
    }

    return result;
  }

  async set(sessionId: string, sessionData: T, expiry?: number | null) {
    await this.upsertSession(sessionId, expiry, sessionData);
    return;
  }

  async get(sessionId: string): Promise<[SessionData, number | null] | null> {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return null;
    }

    const data = JSON.parse(session.data || '{}');
    const expiry = session.expiresAt.getTime();

    return [data, expiry];
  }

  async destroy(sessionId: string) {
    await this.prisma.session.delete({
      where: { id: sessionId },
    });

    return;
  }

  async touch(sessionId: string, expiry?: number | null): Promise<void> {
    await this.upsertSession(sessionId, expiry);
    return;
  }
}
