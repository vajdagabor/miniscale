/* Miniscale -> A tiny package to work with modular scale
 * https://github.com/vajdagabor/miniscale
 */

// All-in-one function for setting up the scale and getting the values.
export const scale = (base, ratio) => {
  if (ratio <= 0) throw new Error("Ratio must be larger than zero");
  return function ms(index) {
    const r = ratio ** index;
    const v = base * r;
    return {
      index,
      ratio: r,
      value: v
    };
  };
};

export const withUnits = ms => {
  return function(...attrs) {
    const result = ms(...attrs);
    return {
      ...result,
      px: result.value + "px",
      rem: result.ratio + "rem",
      em: result.ratio + "em"
    };
  };
};

export const scaleArrayFrom = (ms, { min = 0, max = 0 }) => {
  const base = ms(0).value;
  let steps = [];
  if (min <= 0) throw new Error("Min must be larger than zero");
  if (min > base || max < base) return [];

  for (let index = 0; ms(index).value <= max; index++) steps.push(ms(index));

  for (let index = -1; ms(index).value >= min; index--)
    steps.unshift(ms(index));

  return steps;
};
