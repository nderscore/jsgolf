/* eslint-disable @typescript-eslint/no-explicit-any */

import isEqual from 'lodash/isEqual';

import { serialize } from './util';

export const testEqual = (expected: any, result: any, given: any) => {
  if (expected !== result) {
    throw new Error(
      `${
        given !== undefined ? `Given:\n${serialize(given)}\n` : ''
      }Expected (explicit equal):\n${serialize(expected)}\nGot:\n${serialize(
        result,
      )}`,
    );
  }
};

export const testDeepEqual = (expected: any, result: any, given: any) => {
  if (!isEqual(expected, result)) {
    throw new Error(
      `${
        given !== undefined ? `Given:\n${serialize(given)}\n` : ''
      }Expected (deep equal):\n${serialize(expected)}\nGot:\n${serialize(
        result,
      )}`,
    );
  }
};
