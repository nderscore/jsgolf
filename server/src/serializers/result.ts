export const toGQLResult = (result: true | string) => {
  const success = result === true;
  const errors = !success ? [result as string] : undefined;

  return {
    success,
    errors,
  };
};
