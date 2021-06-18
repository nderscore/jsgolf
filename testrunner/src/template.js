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
  const globalScopeEvalClosure = code => globalScopeEval(`(()=>{${code}})()`);

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

  global.saveReference = (key, val) => {
    references[key] = val;
  };

  globalScopeEvalClosure(/*--SETUP--*/);

  delete global.saveReference;

  const solution = globalScopeEval(/*--SOLUTION--*/);

  await globalScopeEval(/*--TEST--*/)(solution, testFns);

  jail._finished();
})();
