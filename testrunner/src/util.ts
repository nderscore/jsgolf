// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serialize = (value: any) => {
  try {
    return JSON.stringify(value, null, '\t');
  } catch (e) {
    return '(${e.message})';
  }
};
