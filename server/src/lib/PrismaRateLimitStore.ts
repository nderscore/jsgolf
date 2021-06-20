import type { Store as RateLimitStore } from 'graphql-rate-limit';
import type { PrismaClient } from '@prisma/client';

export const DEFAULT_PURGE_INTERVAL = 30 * 60e3; // 30 minutes

const getIdField = ({ contextIdentity, fieldIdentity }: Identity) => {
  if (!contextIdentity) {
    throw new Error('Expected user id in context identity.');
  }

  return `${fieldIdentity}:${contextIdentity}`;
};

const toDate = (val: number) => new Date(val);

const toTimestamp = (val: Date) => val.getTime();

type Identity = {
  readonly contextIdentity: string;
  readonly fieldIdentity: string;
};

export type PrismaRateLimitStoreOptions = {
  prisma: PrismaClient;
  purgeInterval?: number;
};

export class PrismaRateLimitStore implements RateLimitStore {
  private prisma: PrismaClient;

  constructor({
    prisma,
    purgeInterval = DEFAULT_PURGE_INTERVAL,
  }: PrismaRateLimitStoreOptions) {
    this.prisma = prisma;

    this.purgeExpired();
    setInterval(() => this.purgeExpired(), purgeInterval);
  }

  private async purgeExpired() {
    const now = new Date();

    const { count } = await this.prisma.rateLimit.deleteMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });

    return count;
  }

  async setForIdentity(
    identity: Identity,
    timestamps: readonly number[],
    windowMs?: number,
  ) {
    const id = getIdField(identity);

    const expiresAt = new Date(Math.max(...timestamps) + (windowMs || 0));

    const dateTimestamps = timestamps.map(toDate);

    await this.prisma.rateLimit.upsert({
      where: { id },
      update: {
        timestamps: dateTimestamps,
        expiresAt,
      },
      create: {
        id,
        timestamps: dateTimestamps,
        expiresAt,
      },
    });
  }

  async getForIdentity(identity: Identity): Promise<readonly number[]> {
    const id = getIdField(identity);

    const data = await this.prisma.rateLimit.findUnique({
      where: { id },
    });

    return data?.timestamps?.map?.(toTimestamp) || [];
  }
}
