import fs from 'fs';
import path from 'path';

type token = 'TEST' | 'SOLUTION';

const template = fs.readFileSync(
  path.resolve(__dirname, './template.js'),
  'utf-8',
);

const tokenPattern = /\/\*--(SETUP|TEST|SOLUTION)--\*\//g;

export const renderTemplate = (
  SETUP: string,
  TEST: string,
  SOLUTION: string,
) => {
  const key = { SETUP, TEST, SOLUTION };
  return template.replace(tokenPattern, (_, capture) =>
    JSON.stringify(key[capture as token]),
  );
};
