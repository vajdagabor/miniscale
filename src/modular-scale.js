/* Miniscale -> A tiny package to work with modular scale
 * https://github.com/vajdagabor/modular-scale
 */


// All-in-one function for setting up the scale and getting the values.
export const scale = (base, ratio) => {
  if (ratio <= 0) throw(new Error("Ratio must be larger than zero"));
  return(index => ({
    index: index,
    ratio: ratio ** index,
    value: base * ratio ** index
  }));
};

// Assembles an array of steps in the range of min and max.
export const scaleArray = ({ base, ratio, min, max }) => {
  if (min > base || max < base) return [];

  let steps = [];
  let ms = scale(base, ratio);

  for (let index = 0; ms(index).value <= max; index++)
    steps.push(ms(index));

  for (let index = -1; ms(index).value >= min; index--)
    steps.unshift(ms(index));

  return steps;
};
