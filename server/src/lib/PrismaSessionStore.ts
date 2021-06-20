import { PrismaClient } from '.prisma/client';
import { SessionData, SessionStore } from '@mgcrea/fastify-session';
import { EventEmitter } from 'events';

export const DEFAULT_PURGE_INTERVAL = 24 * 60 * 60e3; // 1 day

export type PrismaSessionStoreOptions = {
  prisma: PrismaClient;
  purgeInterval?: number;
};

export class PrismaSessionStore<T extends SessionData = SessionData>
  extends EventEmitter
  implements SessionStore
{
  private readonly prisma: PrismaClient;

  constructor({
    prisma,
    purgeInterval = DEFAULT_PURGE_INTERVAL,
  }: PrismaSessionStoreOptions) {
    super();

    this.prisma = prisma;

    this.purgeExpired();
    setInterval(() => this.purgeExpired(), purgeInterval);
  }

  private async purgeExpired() {
    const now = new Date();

    const { count } = await this.prisma.session.deleteMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });

    return count;
  }

  private async upsertSession(
    sessionId: string,
    expiry?: number | null,
    sessionData?: T,
  ) {
    const expiresAt = expiry ? new Date(expiry) : new Date();

    const data = (
      sessionData !== undefined ? JSON.stringify(sessionData) : undefined
    ) as string;

    const result = await this.prisma.session.upsert({
      where: { id: sessionId },
      update: {
        expiresAt,
        data,
      },
      create: {
        id: sessionId,
        expiresAt,
        data: data || '{}',
      },
    });

    return result;
  }

  async set(sessionId: string, sessionData: T, expiry?: number | null) {
    await this.upsertSession(sessionId, expiry, sessionData);
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
  }

  async touch(sessionId: string, expiry?: number | null): Promise<void> {
    await this.upsertSession(sessionId, expiry);
  }
}
