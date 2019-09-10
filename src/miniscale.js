/* Miniscale -> A tiny package to work with modular scale
 * https://github.com/vajdagabor/miniscale
 */

// All-in-one function for setting up the scale and getting the values.
export const scale = (base, ratio) => {
  if (ratio <= 0) throw new Error("Ratio must be larger than zero");
  return function(index) {
    const r = ratio ** index;
    const v = base * r;
    return {
      index,
      ratio: r,
      value: v,
      px: v + "px",
      rem: r + "rem",
      em: r + "em"
    };
  };
};

// Assembles an array of steps in the range of min and max.
export const scaleArray = ({ base, ratio, min, max }) => {
  if (base <= 0) throw new Error("Base must be larger than zero");
  if (ratio <= 1) throw new Error("Ratio must be larger than 1");
  if (min <= 0) throw new Error("Min must be larger than zero");

  if (min > base || max < base) return [];

  let steps = [];
  let ms = scale(base, ratio);

  for (let index = 0; ms(index).value <= max; index++) steps.push(ms(index));

  for (let index = -1; ms(index).value >= min; index--)
    steps.unshift(ms(index));

  return steps;
};
