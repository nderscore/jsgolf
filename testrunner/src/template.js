// test harness
(async () => {
  const externalFns = ['testEqual', 'testDeepEqual'];
  const jail = [...externalFns, '_finished'].reduce((acc, key) => {
    acc[key] = global[key];
    delete global[key];
    return acc;
  }, {});

  jail.eval = eval;
  const globalScopeEval = code => (0, jail.eval)(code);
  const gseSetup = code =>
    globalScopeEval(`
      async ({ saveReference })=>{${code}}
    `);
  const gseTest = code =>
    globalScopeEval(`
      async (solution, {
        loadReference,
        testEqual,
        testDeepEqual,
      })=>{${code}}
    `);

  const references = {};
  const testFns = externalFns.reduce(
    (acc, key) => {
      acc[key] = jail[key];
      return acc;
    },
    {
      loadReference: key => references[key],
    },
  );

  gseSetup(/*--SETUP--*/)({
    saveReference: (key, val) => {
      references[key] = val;
    },
  });

  delete global.saveReference;

  const solution = globalScopeEval(/*--SOLUTION--*/);

  await gseTest(/*--TEST--*/)(solution, testFns);

  jail._finished();
})();
