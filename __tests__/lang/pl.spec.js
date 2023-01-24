const unitTestingTask = require("../../unitTestingTask");
require("../../lang/pl");

describe("unitTestingTask with pl language", () => {
  const mockDate = new Date("2022-02-03T06:03:05.005Z");

  beforeEach(() => {
    unitTestingTask.lang("pl");
  });

  it("should have pl as current language", () => {
    expect(unitTestingTask.lang()).toBe("pl");
  });

  it("should return month in the nominative case", () => {
    expect(unitTestingTask("MMMM", mockDate)).toBe("luty");
  });

  it("should return month in the accusative case", () => {
    expect(unitTestingTask("dd MMMM", mockDate)).toBe("03 lutego");
  });

  it("should return short month in the nominative case", () => {
    expect(unitTestingTask("MMM", mockDate)).toBe("lut");
  });

  it("should return short month in the accusative case", () => {
    expect(unitTestingTask("d MMM", mockDate)).toBe("3 lut");
  });

  it("should return full weekday", () => {
    expect(unitTestingTask("DDD", mockDate)).toBe("czwartek");
  });

  it("should return short weekday", () => {
    expect(unitTestingTask("DD", mockDate)).toBe("czw");
  });

  it("should return minimal weekday", () => {
    expect(unitTestingTask("D", mockDate)).toBe("Cz");
  });

  it("should return 'rano' after hour for AM hours", () => {
    expect(unitTestingTask("H a", mockDate)).toBe("7 rano");
  });

  it("should return nothing after hour for PM hours", () => {
    const mockDate = new Date("2022-02-03T15:03:05.005Z");
    expect(unitTestingTask("Ha", mockDate)).toBe("16");
  });
});
