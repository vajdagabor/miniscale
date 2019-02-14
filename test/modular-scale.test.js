import * as modular from "../src/modular-scale";


describe("proportion() function", () => {

  it("returns a Number", () => {
    expect(typeof modular.proportion(1.125, 5)).toBe("number");
  });

  it("returns 1 when index is zero", () => {
    expect(modular.proportion(1.125, 0)).toBe(1);
  });

  it("calculates the right ratio", () => {
    expect(modular.proportion(1.125, 1)).toBe(1.125);
    expect(modular.proportion(1.125, 2)).toBe(1.265625);
    expect(modular.proportion(1.2, 5)).toBe(2.48832);
  });

  it("works with negative index", () => {
    expect(modular.proportion(1.5, -1)).toBe(0.6666666666666666);
    expect(modular.proportion(1.5, -5)).toBe(0.13168724279835392);
  });

  it("throws error when ratio is zero", () => {
    expect(() => modular.proportion(0, 10)).toThrow();
  });

  it("throws error when ratio is zero or negative", () => {
    expect(() => modular.proportion(-5.5, 10)).toThrow();
  });
});

describe("size() function", () => {

  it("returns the base value when distance is zero", () => {
    expect(modular.size(16, 1.125, 0)).toBe(16);
  });

  it("returns the correct size with positive distance", () => {
    expect(modular.size(16, 1.2, 1)).toBe(19.2);
    expect(modular.size(16, 5.5, 4)).toBe(14641);
  });

  it("returns the correct size with negative distance", () => {
    expect(modular.size(16, 1.2, -1)).toBe(13.333333333333334);
    expect(modular.size(16, 5.5, -4)).toBe(0.017485144457345808);
  });

  it("throws error when ratio is zero", () => {
    expect(() => modular.size(16, 0, 10)).toThrow();
  });

  it("throws error when ratio is zero or negative", () => {
    expect(() => modular.size(16, -5.5, 10)).toThrow();
  });

});

describe("scale() function", () => {

  const ms = modular.scale(16, 1.125);

  it("returns a function", () => {
    expect(typeof ms).toBe("function");
  });

  it("returns a function that returns an object", () => {
    expect(typeof ms(0)).toBe("object");
  });

  it("returns the correct values when called with index 0", () => {
    expect(ms(0)).toMatchObject({
      index: 0, value: 16, ratio: 1
    });
  });

  it("returns the correct values when called with positive index", () => {
    expect(ms(5)).toMatchObject({
      index: 5, value: 28.83251953125, ratio: 1.802032470703125
    });
  });

  it("returns the correct values when called with negative index", () => {
    expect(ms(-5)).toMatchObject({
      index: -5, value: 8.878863316906298, ratio: 0.5549289573066436
    });
  });
});

describe("scaleArray() function", () => {

  it("returns a scale as array, in the of min and max", () => {
    const msa = modular.scaleArray({base: 16, ratio: 1.125, min: 14, max: 25});
    expect(msa).toMatchObject([
      {index: -1, value: 14.222222222222221, ratio: 0.8888888888888888},
      {index: 0, value: 16, ratio: 1},
      {index: 1, value: 18, ratio: 1.125},
      {index: 2, value: 20.25, ratio: 1.265625},
      {index: 3, value: 22.78125, ratio: 1.423828125},
    ])
  });

  it("includes min and max values", () => {
    const msa = modular.scaleArray({base: 16, ratio: 1.125, min: 14.222222222222221, max: 18});
    expect(msa).toMatchObject([
      {index: -1, value: 14.222222222222221, ratio: 0.8888888888888888},
      {index: 0, value: 16, ratio: 1},
      {index: 1, value: 18, ratio: 1.125}
    ])
  });
});
