import * as modular from "../src/miniscale";

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
      index: 0,
      value: 16,
      ratio: 1,
      px: "16px",
      rem: "1rem",
      em: "1em"
    });
    expect(ms2(0)).toMatchObject({
      index: 0,
      value: 21,
      ratio: 1,
      px: "21px",
      rem: "1rem",
      em: "1em"
    });
    expect(ms3(0)).toMatchObject({
      index: 0,
      value: 13.5,
      ratio: 1,
      px: "13.5px",
      rem: "1rem",
      em: "1em"
    });
  });

  it("returns the correct values when called with positive index", () => {
    expect(ms1(5)).toMatchObject({
      index: 5,
      value: 28.83251953125,
      ratio: 1.802032470703125,
      px: "28.83251953125px",
      rem: "1.802032470703125rem",
      em: "1.802032470703125em"
    });
    expect(ms2(2)).toMatchObject({
      index: 2,
      value: 30.24,
      ratio: 1.44,
      px: "30.24px",
      rem: "1.44rem",
      em: "1.44em"
    });
    expect(ms3(7)).toMatchObject({
      index: 7,
      value: 230.66015625,
      ratio: 17.0859375,
      px: "230.66015625px",
      rem: "17.0859375rem",
      em: "17.0859375em"
    });
  });

  it("returns the correct values when called with negative index", () => {
    expect(ms1(-5)).toMatchObject({
      index: -5,
      value: 8.878863316906298,
      ratio: 0.5549289573066436,
      px: "8.878863316906298px",
      rem: "0.5549289573066436rem",
      em: "0.5549289573066436em"
    });
    expect(ms2(-2)).toMatchObject({
      index: -2,
      value: 14.583333333333332,
      ratio: 0.6944444444444444,
      px: "14.583333333333332px",
      rem: "0.6944444444444444rem",
      em: "0.6944444444444444em"
    });
    expect(ms3(-7)).toMatchObject({
      index: -7,
      value: 0.7901234567901234,
      ratio: 0.05852766346593507,
      px: "0.7901234567901234px",
      rem: "0.05852766346593507rem",
      em: "0.05852766346593507em"
    });
  });
});

describe("scaleArray() function", () => {
  it("throws error when ratio is not larger than 1", () => {
    expect(() =>
      modular.scaleArray({ base: 16, ratio: 1, min: 1, max: 100 })
    ).toThrow();
    expect(() =>
      modular.scaleArray({ base: 16, ratio: 0, min: 1, max: 100 })
    ).toThrow();
    expect(() =>
      modular.scaleArray({ base: 16, ratio: -10, min: 1, max: 100 })
    ).toThrow();
  });

  it("throws error when base is not larger than zero", () => {
    expect(() =>
      modular.scaleArray({ base: 0, ratio: 1.2, min: 0, max: 100 })
    ).toThrow();
    expect(() =>
      modular.scaleArray({ base: -1, ratio: 1.2, min: -1, max: 100 })
    ).toThrow();
  });

  it("throws error when min is not larger than zer", () => {
    expect(() =>
      modular.scaleArray({ base: 16, ratio: 1.2, min: 0, max: 100 })
    ).toThrow();
    expect(() =>
      modular.scaleArray({ base: 16, ratio: 1.2, min: -1, max: 100 })
    ).toThrow();
  });

  it("returns a scale as array, in the of min and max", () => {
    const steps = modular.scaleArray({
      base: 16,
      ratio: 1.125,
      min: 14,
      max: 25
    });
    expect(steps).toMatchObject([
      {
        index: -1,
        value: 14.222222222222221,
        ratio: 0.8888888888888888,
        px: "14.222222222222221px",
        rem: "0.8888888888888888rem",
        em: "0.8888888888888888em"
      },
      { index: 0, value: 16, ratio: 1, px: "16px", rem: "1rem", em: "1em" },
      {
        index: 1,
        value: 18,
        ratio: 1.125,
        px: "18px",
        rem: "1.125rem",
        em: "1.125em"
      },
      {
        index: 2,
        value: 20.25,
        ratio: 1.265625,
        px: "20.25px",
        rem: "1.265625rem",
        em: "1.265625em"
      },
      {
        index: 3,
        value: 22.78125,
        ratio: 1.423828125,
        px: "22.78125px",
        rem: "1.423828125rem",
        em: "1.423828125em"
      }
    ]);
  });

  it("includes min and max values", () => {
    const steps = modular.scaleArray({
      base: 16,
      ratio: 1.125,
      min: 14.222222222222221,
      max: 18
    });
    expect(steps).toMatchObject([
      {
        index: -1,
        value: 14.222222222222221,
        ratio: 0.8888888888888888,
        px: "14.222222222222221px",
        rem: "0.8888888888888888rem",
        em: "0.8888888888888888em"
      },
      { index: 0, value: 16, ratio: 1, px: "16px", rem: "1rem", em: "1em" },
      {
        index: 1,
        value: 18,
        ratio: 1.125,
        px: "18px",
        rem: "1.125rem",
        em: "1.125em"
      }
    ]);
  });
});
