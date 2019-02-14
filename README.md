# Miniscale

A tiny package to work with **modular scale**, which is most useful for
[meaningful typography](https://alistapart.com/article/more-meaningful-typography).

## Installation

```sh
npm install miniscale
```

## How to use

Import Miniscale:

```js
import * as modular from 'miniscale';
```

Set up your scale with a base (font) size, and a ratio:

```js
const ms = modular.scale(16, 1.125);
```

Calculate certain steps, sizes and ratios, while walking up or down
on the scale:

```js
// Two steps up from the base
ms(2)         // -> { index: 1, value: 20.25, ratio: 1.265625 }
ms(2).value   // -> 20.25

// One step down
ms(-1).ratio  // -> 0.8888888888888888

// Get the base
ms(0)         // -> { index: 0, value: 16, ratio: 1}
```

The `scale()` function calculates the values on the fly. If you need,
you can generate an array instead, in the range of `min` and `max` size,
with the `scaleArray()` function:

```js
const steps = modular.scaleArray({ base: 16, ratio: 1.125, min: 14, max: 36 })

/*
 *[ { index: -1, value: 14.222222222222221, ratio: 0.8888888888888888 },
 *  { index: 0, value: 16, ratio: 1 },
 *  { index: 1, value: 18, ratio: 1.125 },
 *  { index: 2, value: 20.25, ratio: 1.265625 },
 *  { index: 3, value: 22.78125, ratio: 1.423828125 },
 *  { index: 4, value: 25.62890625, ratio: 1.601806640625 },
 *  { index: 5, value: 28.83251953125, ratio: 1.802032470703125 },
 *  { index: 6, value: 32.43658447265625, ratio: 2.0272865295410156 } ]
 */
```
