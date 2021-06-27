import type { MercuriusContext } from 'mercurius';

const CODE_SIZE_CONSTRAINT = 16384; // 16 KiB

export const getCodeSize = (code: string) => Buffer.byteLength(code, 'utf8');

export const testCodeSizeConstraints = (...codes: string[]) => {
  for (const code of codes) {
    if (getCodeSize(code) > CODE_SIZE_CONSTRAINT) {
      throw new Error('Maximum code length exceeded.');
    }
  }
};

export const getAuthenticatedUserIdOrFail = (
  authentication?: MercuriusContext['authentication'],
) => {
  const userId = authentication?.userId;

  if (!userId) {
    throw new Error('Invalid state: Missing auth.');
  }

  return userId;
};
