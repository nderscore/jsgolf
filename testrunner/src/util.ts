export const serialize = (value: unknown) => {
  try {
    return JSON.stringify(value, null, '\t');
  } catch (e) {
    return '(${e.message})';
  }
};
