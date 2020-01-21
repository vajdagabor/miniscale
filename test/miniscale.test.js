import { scale, withUnits, scaleArrayFrom } from "../src/miniscale";

describe("scale() function", () => {
  const ms1 = scale(16, 1.125);
  const ms2 = scale(21, 1.2);
  const ms3 = scale(13.5, 1.5);

  it("throws error when ratio is zero", () => {
    expect(() => scale(16, 0)).toThrow();
  });

  it("throws error when ratio is negative", () => {
    expect(() => scale(16, -3)).toThrow();
  });

  it("returns a function", () => {
    expect(typeof ms1).toBe("function");
  });

  it("returns a function that returns an object", () => {
    expect(typeof ms1(0)).toBe("object");
  });

  it("returns the correct values when called with zero index", () => {
    expect(ms1(0)).toMatchObject({
      index: 0,
      value: 16,
      ratio: 1
    });
    expect(ms2(0)).toMatchObject({
      index: 0,
      value: 21,
      ratio: 1
    });
    expect(ms3(0)).toMatchObject({
      index: 0,
      value: 13.5,
      ratio: 1
    });
  });

  it("returns the correct values when called with positive index", () => {
    expect(ms1(5)).toMatchObject({
      index: 5,
      value: 28.83251953125,
      ratio: 1.802032470703125
    });
    expect(ms2(2)).toMatchObject({
      index: 2,
      value: 30.24,
      ratio: 1.44
    });
    expect(ms3(7)).toMatchObject({
      index: 7,
      value: 230.66015625,
      ratio: 17.0859375
    });
  });

  it("returns the correct values when called with negative index", () => {
    expect(ms1(-5)).toMatchObject({
      index: -5,
      value: 8.878863316906298,
      ratio: 0.5549289573066436
    });
    expect(ms2(-2)).toMatchObject({
      index: -2,
      value: 14.583333333333332,
      ratio: 0.6944444444444444
    });
    expect(ms3(-7)).toMatchObject({
      index: -7,
      value: 0.7901234567901234,
      ratio: 0.05852766346593507
    });
  });

  it("accepts a second parameter that works as multiplier", () => {
    const ms = scale(10, 2); // 10, 20, 40, 80

    expect(ms(0, 2)).toMatchObject({
      index: 0,
      value: 10 * 2,
      ratio: 1 * 2
    });

    expect(ms(2, 4)).toMatchObject({
      index: 2,
      value: 40 * 4,
      ratio: 4 * 4
    });

    expect(ms(-2, 3)).toMatchObject({
      index: -2,
      value: 2.5 * 3,
      ratio: 0.25 * 3
    });
  });
});

describe("withUnits()", () => {
  const msu = withUnits(scale(10, 2));

  it("makes scale() to include values with units in the final result", () => {
    expect(msu(0)).toMatchObject({
      index: 0,
      value: 10,
      ratio: 1,
      px: "10px",
      rem: "1rem",
      em: "1em"
    });
    expect(msu(2)).toMatchObject({
      index: 2,
      value: 40,
      ratio: 4,
      px: "40px",
      rem: "4rem",
      em: "4em"
    });
  });

  it("works with multiplier", () => {
    expect(msu(0, 20)).toMatchObject({
      index: 0,
      value: 200,
      ratio: 20,
      px: "200px",
      rem: "20rem",
      em: "20em"
    });
  });
});

describe("scaleArrayFrom()", () => {
  it("throws error when either min or max is undefined", () => {
    expect(() => scaleArrayFrom(scale(16, 1.2))).toThrow();
    expect(() => scaleArrayFrom(scale(16, 1.2), { min: 10 })).toThrow();
    expect(() => scaleArrayFrom(scale(16, 1.2), { max: 10 })).toThrow();
  });

  it("throws error when min is not larger than zero", () => {
    expect(() =>
      scaleArrayFrom(scale(16, 1.2), { min: 0, max: 100 })
    ).toThrow();
    expect(() =>
      scaleArrayFrom(scale(16, 1.2), { min: -1, max: 100 })
    ).toThrow();
  });

  it("throws error when max is not larger than min", () => {
    expect(() =>
      scaleArrayFrom(scale(16, 1.2), { min: 10, max: 10 })
    ).toThrow();
    expect(() => scaleArrayFrom(scale(16, 1.2), { min: 2, max: 1 })).toThrow();
  });

  it("returns a scale as array, in the range of min and max", () => {
    const steps = scaleArrayFrom(scale(16, 1.125), {
      min: 14,
      max: 25
    });
    expect(steps).toMatchObject([
      {
        index: -1,
        value: 14.222222222222221,
        ratio: 0.8888888888888888
      },
      { index: 0, value: 16, ratio: 1 },
      {
        index: 1,
        value: 18,
        ratio: 1.125
      },
      {
        index: 2,
        value: 20.25,
        ratio: 1.265625
      },
      {
        index: 3,
        value: 22.78125,
        ratio: 1.423828125
      }
    ]);
  });

  it("includes min and max values", () => {
    const steps = scaleArrayFrom(scale(16, 1.125), {
      min: 14.222222222222221,
      max: 18
    });
    expect(steps).toMatchObject([
      {
        index: -1,
        value: 14.222222222222221,
        ratio: 0.8888888888888888
      },
      { index: 0, value: 16, ratio: 1 },
      {
        index: 1,
        value: 18,
        ratio: 1.125
      }
    ]);
  });

  it("works when max is smaller than base", () => {
    const steps = scaleArrayFrom(scale(24, 2), { min: 3, max: 6 });
    expect(steps).toMatchObject([
      { index: -3, ratio: 0.125, value: 3 },
      { index: -2, ratio: 0.25, value: 6 }
    ]);
  });

  it("works when min is larger than base", () => {
    const steps = scaleArrayFrom(scale(12, 2), { min: 24, max: 48 });
    expect(steps).toMatchObject([
      { index: 1, ratio: 2, value: 24 },
      { index: 2, ratio: 4, value: 48 }
    ]);
  });

  it("includes values with units when called as scaleArrayFrom(withUnits(scale, min, max))", () => {
    const steps = scaleArrayFrom(withUnits(scale(10, 2)), { min: 2, max: 30 });
    expect(steps).toMatchObject([
      {
        index: -2,
        value: 2.5,
        ratio: 0.25,
        px: "2.5px",
        rem: "0.25rem",
        em: "0.25em"
      },
      {
        index: -1,
        value: 5,
        ratio: 0.5,
        px: "5px",
        rem: "0.5rem",
        em: "0.5em"
      },
      {
        index: 0,
        value: 10,
        ratio: 1,
        px: "10px",
        rem: "1rem",
        em: "1em"
      },
      {
        index: 1,
        value: 20,
        ratio: 2,
        px: "20px",
        rem: "2rem",
        em: "2em"
      }
    ]);
  });
});
