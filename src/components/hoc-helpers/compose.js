const compose = (...funcs) => (comp) => {
  return funcs.reduceRight((prevResults, f) => f(prevResults), comp);
};

export default compose;