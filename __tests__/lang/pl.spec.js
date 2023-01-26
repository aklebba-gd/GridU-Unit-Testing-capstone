const unitTestingTask = require("../../unitTestingTask");
require("../../lang/pl");

const mockDate = new Date("2022-02-03T06:03:05.005Z");

describe("unitTestingTask pl language", () => {
  beforeAll(() => {
    unitTestingTask.lang("pl");
  });

  it("should have pl as current language", () => {
    expect(unitTestingTask.lang()).toBe("pl");
  });
});

describe("unitTestingTask pl - month format", () => {
  it.concurrent.each([
    ["MMMM", "luty"],
    ["dd MMMM", "03 lutego"],
    ["MMM", "lut"],
    ["d MMM", "3 lut"],
  ])("for format %s should return %s", (format, expected) => {
    expect(unitTestingTask(format, mockDate)).toBe(expected);
  });
});

describe("unitTestingTask pl - day format", () => {
  it.concurrent.each([
    ["DDD", "czwartek"],
    ["DD", "czw"],
    ["D", "Cz"],
  ])("for format %s should return %s", (format, expected) => {
    expect(unitTestingTask(format, mockDate)).toBe(expected);
  });
});

describe("unitTestingTask pl - hour format", () => {
  it("should return 'rano' after hour for AM hours", () => {
    expect(unitTestingTask("H a", mockDate)).toBe("7 rano");
  });

  it("should return nothing after hour for PM hours", () => {
    const mockDate = new Date("2022-02-03T15:03:05.005Z");
    expect(unitTestingTask("H a", mockDate)).toBe("16 ");
  });
});
