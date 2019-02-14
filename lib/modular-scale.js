/*
 * A tiny library to work with modular scale
 * by Gabor Vajda
 *
 */

/*
 * Returns the proportion between two steps on the scale.
 * The distance attribute should be the number of steps.
 * Example:
 *
 * proportion(1.2, 0)  // -> 1
 * proportion(1.2, 1)  // -> 1.2
 * proportion(1.2, 2)  // -> 1.44
 * proportion(1.2, -2) // -> 0.6944444444444444
 */
export const proportion = (ratio, distance) => {
  if (ratio <= 0) throw new Error("Ratio must be larger than zero");
  return ratio ** distance;
};
/*
 * Calculate size from base size, ratio and distance from the base in steps.
 * Example:
 *
 * size(16, 1.2, 5)  // -> 39.81312
 */

export const size = (base, ratio, distance) => {
  return base * proportion(ratio, distance);
};
/*
 * All-in-one function to set up your scale, and get the values.
 * Example:
 *
 * const [base, ratio] = [16, 1.125];
 * const ms = scale(base, ratio);
 * ms(2)       // -> { index: 1, px: 20.25, rem: 1.265625 }
 * ms(2).value    // -> 20.25
 * ms(-1).ratio  // -> 0.8888888888888888
 */

export const scale = (base, ratio) => index => ({
  index: index,
  value: size(base, ratio, index),
  ratio: proportion(ratio, index)
});
/*
 * Assembles a scale in the range of min and max.
 */

export const scaleArray = ({
  base,
  ratio,
  min,
  max
}) => {
  if (min > base || max < base) return [];
  let steps = [];
  let ms = scale(base, ratio);

  for (let index = 0; ms(index).value <= max; index++) steps.push(ms(index));

  for (let index = -1; ms(index).value >= min; index--) steps.unshift(ms(index));

  return steps;
};