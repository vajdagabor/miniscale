/**
 * Miniscale -> A tiny package to work with modular scale
 * https://github.com/vajdagabor/miniscale
 *
 * Type definitions
 * ----------------
 *
 * @typedef {object} Step - A step of the modular scale
 * @property {number} index - The index of the step
 * @property {number} ratio - The proportion between the step at `index` and 0
 * @property {number} value - The value of the step
 *
 * @typedef {object} StepCSSUnits - CSS unit extension for a step
 * @property {string} px - The value as `px`
 * @property {string} rem - The ratio as `rem`
 * @property {string} em - The ratio as `em`
 *
 * @typedef {Step & StepCSSUnits} StepWithCSSUnits
 *
 * -----------------
 */

/**
 * Sets up a modular scale
 * @param {number} base - The base value of the scale
 * @param {number} ratio - The proportion between the steps on the scale
 */

export function scale(base, ratio) {
  if (ratio <= 0) throw new Error("Ratio must be larger than zero")

  return (
    /**
     * Returns the step at `index`
     * @param {number} index - The `index` of the requested step
     * @param {number=} multiplier - Simply multiplies the values
     * @returns {Step}
     */

    function ms(index, multiplier = 1) {
      const r = ratio ** index * multiplier
      const v = base * r
      return {
        index,
        ratio: r,
        value: v
      }
    }
  )
}

/**
 * Extends the scale with CSS units
 *
 * @param {function} ms - A modular scale, generated by the `scale()` function
 */
export function withUnits(ms) {
  return (
    /**
     * Returns the step at `index`
     * @param {number} index - The `index` of the requested step
     * @param {number=} multiplier - Simply multiplies the values
     * @returns {StepWithCSSUnits}
     */

    function(index, multiplier = 1) {
      const result = ms(index, multiplier)

      return {
        ...result,
        px: result.value + "px",
        rem: result.ratio + "rem",
        em: result.ratio + "em"
      }
    }
  )
}

/**
 * Generates an array of step values from a scale, between `min` and `max`
 * @param {function} ms - A modular scale, generated by the `scale()` function
 * @param {object} options
 * @param {number} options.min - The lower boundary of the values on the scale
 * @param {number} options.max - The upper boundary of the values on the scale
 * @return {Step[]|StepWithCSSUnits[]}
 */

export function scaleArray(ms, { min, max }) {
  let steps = []
  if (typeof min !== "number" || typeof max !== "number")
    throw new Error("Min and max should be defined as numbers")
  if (min <= 0) throw new Error("Min must be larger than zero")
  if (max <= min) throw new Error("Max must be larger than min")

  for (let index = 0; ms(index).value <= max; index++)
    if (ms(index).value >= min) steps.push(ms(index))

  for (let index = -1; ms(index).value >= min; index--)
    if (ms(index).value <= max) steps.unshift(ms(index))

  return steps
}

export { scaleArray as scaleArrayFrom }
