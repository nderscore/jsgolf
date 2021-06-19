import type { Store as RateLimitStore } from 'graphql-rate-limit';
import type { PrismaClient } from '@prisma/client';

export const DEFAULT_EXPIRY_PERIOD = 15 * 60e3; // 15 minutes

const getIdField = ({ contextIdentity, fieldIdentity }: Identity) =>
  `${fieldIdentity}:${contextIdentity}`;

type Identity = {
  readonly contextIdentity: string;
  readonly fieldIdentity: string;
};

export type PrismaRateLimitStoreOptions = {
  prisma: PrismaClient;
  expiryPeriod?: number;
};

export class PrismaRateLimitStore implements RateLimitStore {
  private prisma: PrismaClient;

  constructor({
    prisma,
    expiryPeriod = DEFAULT_EXPIRY_PERIOD,
  }: PrismaRateLimitStoreOptions) {
    this.prisma = prisma;

    this.flushExpired();
    setInterval(() => this.flushExpired(), expiryPeriod);
  }

  private flushExpired() {
    const now = new Date();

    this.prisma.rateLimit.deleteMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });
  }

  async setForIdentity(
    identity: Identity,
    timestamps: readonly number[],
    windowMs?: number,
  ) {
    const { contextIdentity } = identity;

    if (!contextIdentity) {
      throw new Error('Expected user id.');
    }

    const id = getIdField(identity);

    const expiresAt = new Date(Math.max(...timestamps) + (windowMs || 0));

    const dateTimestamps = timestamps.map(val => new Date(val));

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
    const { contextIdentity } = identity;

    if (!contextIdentity) {
      throw new Error('Expected user id.');
    }

    const id = getIdField(identity);

    const data = await this.prisma.rateLimit.findUnique({
      where: { id },
    });

    return data?.timestamps?.map(val => val.getTime()) || [];
  }
}
