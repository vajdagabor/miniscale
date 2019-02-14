/* Miniscale -> A tiny package to work with modular scale
 * https://github.com/vajdagabor/modular-scale
 */


// Returns the proportion between two steps on the scale.
export const proportion = (ratio, distance) => {
  if (ratio <= 0) throw(new Error("Ratio must be larger than zero"));
  return ratio ** distance;
}

// Calculates size from base size, ratio and distance from the base.
export const size = (base, ratio, distance) => {
  return base * proportion(ratio, distance);
}

// All-in-one function for setting up the scale and getting the values.
export const scale = (base, ratio) => (
  index => ({
    index: index,
    value: size(base, ratio, index),
    ratio: proportion(ratio, index)
  })
);

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
