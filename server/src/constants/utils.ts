const CODE_SIZE_CONSTRAINT = 16384; // 16 KiB

export const getCodeSize = (code: string) => Buffer.byteLength(code, 'utf8');

export const testCodeSizeConstraints = (...codes: string[]) => {
  for (const code of codes) {
    if (getCodeSize(code) > CODE_SIZE_CONSTRAINT) {
      throw new Error('Maximum code length exceeded.');
    }
  }
};
