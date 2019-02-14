import * as modular from "../src/modular-scale";


describe("scale() function", () => {

  const ms1 = modular.scale(16, 1.125);
  const ms2 = modular.scale(21, 1.2);
  const ms3 = modular.scale(13.5, 1.5);

  it("throws error when ratio is zero", () => {
    expect(() => modular.scale(16, 0)).toThrow();
  });

  it("throws error when ratio is negative", () => {
    expect(() => modular.scale(16, -3)).toThrow();
  });

  it("returns a function", () => {
    expect(typeof ms1).toBe("function");
  });

  it("returns a function that returns an object", () => {
    expect(typeof ms1(0)).toBe("object");
  });

  it("returns the correct values when called with zero index", () => {
    expect(ms1(0)).toMatchObject({
      index: 0, value: 16, ratio: 1
    });
    expect(ms2(0)).toMatchObject({
      index: 0, value: 21, ratio: 1
    });
    expect(ms3(0)).toMatchObject({
      index: 0, value: 13.5, ratio: 1
    });
  });

  it("returns the correct values when called with positive index", () => {
    expect(ms1(5)).toMatchObject({
      index: 5, value: 28.83251953125, ratio: 1.802032470703125
    });
    expect(ms2(2)).toMatchObject({
      index: 2, value: 30.24, ratio: 1.44
    });
    expect(ms3(7)).toMatchObject({
      index: 7, value: 230.66015625, ratio: 17.0859375
    });
  });

  it("returns the correct values when called with negative index", () => {
    expect(ms1(-5)).toMatchObject({
      index: -5, value: 8.878863316906298, ratio: 0.5549289573066436
    });
    expect(ms2(-2)).toMatchObject({
      index: -2, value: 14.583333333333332, ratio: 0.6944444444444444
    });
    expect(ms3(-7)).toMatchObject({
      index: -7, value: 0.7901234567901234, ratio: 0.05852766346593507
    });
  });
});

describe("scaleArray() function", () => {

  it("returns a scale as array, in the of min and max", () => {
    const steps = modular.scaleArray({base: 16, ratio: 1.125, min: 14, max: 25});
    expect(steps).toMatchObject([
      {index: -1, value: 14.222222222222221, ratio: 0.8888888888888888},
      {index: 0, value: 16, ratio: 1},
      {index: 1, value: 18, ratio: 1.125},
      {index: 2, value: 20.25, ratio: 1.265625},
      {index: 3, value: 22.78125, ratio: 1.423828125},
    ])
  });

  it("includes min and max values", () => {
    const steps = modular.scaleArray({base: 16, ratio: 1.125, min: 14.222222222222221, max: 18});
    expect(steps).toMatchObject([
      {index: -1, value: 14.222222222222221, ratio: 0.8888888888888888},
      {index: 0, value: 16, ratio: 1},
      {index: 1, value: 18, ratio: 1.125}
    ])
  });
});
