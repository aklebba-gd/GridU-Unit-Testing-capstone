const unitTestingTask = require("../unitTestingTask");

const mockDate = new Date("2022-02-03T06:03:05.005Z");

describe("unitTestingTask en language", () => {
  beforeAll(() => {
    unitTestingTask.lang("en");
  });

  it("should have en as current language", () => {
    expect(unitTestingTask.lang()).toBe("en");
  });
});

describe("unitTestingTask with correct arguments", () => {
  it("should not throw an error if called with string as first argument", () => {
    expect(() => unitTestingTask("en", mockDate)).not.toThrow();
  });

  it("should not throw an error if called without second argument", () => {
    expect(() => unitTestingTask("YY")).not.toThrow();
  });
});

describe("unitTestingTask with incorrect arguments", () => {
  it("should throw an error if called with no arguments", () => {
    expect(() => unitTestingTask()).toThrow("Argument `format` must be a string");
  });

  it("should throw an error if called with empty string as first argument", () => {
    expect(() => unitTestingTask("", mockDate)).toThrow("Argument `format` must be a string");
  });

  it("should throw an error if called with number as first argument", () => {
    expect(() => unitTestingTask(42, mockDate)).toThrow("Argument `format` must be a string");
  });

  it("should throw an error if called with object as first argument", () => {
    expect(() => unitTestingTask({ string: "randomString" }, mockDate)).toThrow();
  });

  it("should throw an error if called with object as second argument", () => {
    expect(() => unitTestingTask("YY", { name: "someName" })).toThrow();
  });
});

describe("unitTestingTask year format", () => {
  it.concurrent.each([
    ["YYYY", "2022"],
    ["YY", "22"],
  ])("for format %s should return %s", (format, expected) => {
    expect(unitTestingTask(format, mockDate)).toBe(expected);
  });
});

describe("unitTestingTask month format", () => {
  it.concurrent.each([
    ["MMMM", "February"],
    ["MMM", "Feb"],
    ["MM", "02"],
    ["M", "2"],
  ])("for format %s should return %s", (format, expected) => {
    expect(unitTestingTask(format, mockDate)).toBe(expected);
  });
});

describe("unitTestingTask day format", () => {
  it.concurrent.each([
    ["DDD", "Thursday"],
    ["DD", "Thu"],
    ["D", "Th"],
    ["dd", "03"],
    ["d", "3"],
  ])("for format %s should return %s", (format, expected) => {
    expect(unitTestingTask(format, mockDate)).toBe(expected);
  });
});

describe("unitTestingTask hour format", () => {
  it.concurrent.each([
    ["HH", "07"],
    ["H", "7"],
  ])("for format %s should return %s", (format, expected) => {
    expect(unitTestingTask(format, mockDate)).toBe(expected);
  });

  it.concurrent.each([
    ["hh", "04"],
    ["h", "4"],
  ])("for format %s should return %s", (format, expected) => {
    const pmHourMockDate = new Date("2022-02-03T15:03:05.005Z");
    expect(unitTestingTask(format, pmHourMockDate)).toBe(expected);
  });
});

describe("unitTestingTask minute format", () => {
  it.concurrent.each([
    ["mm", "03"],
    ["m", "3"],
  ])("for format %s should return %s", (format, expected) => {
    expect(unitTestingTask(format, mockDate)).toBe(expected);
  });
});

describe("unitTestingTask second format", () => {
  it.concurrent.each([
    ["ss", "05"],
    ["s", "5"],
  ])("for format %s should return %s", (format, expected) => {
    expect(unitTestingTask(format, mockDate)).toBe(expected);
  });
});

describe("unitTestingTask milisecond format", () => {
  it.concurrent.each([
    ["ff", "005"],
    ["f", "5"],
  ])("for format %s should return %s", (format, expected) => {
    expect(unitTestingTask(format, mockDate)).toBe(expected);
  });
});

describe("unitTestingTask AM/PM format", () => {
  it.concurrent.each([
    ["A", "AM"],
    ["a", "am"],
  ])("for format %s should return %s", (format, expected) => {
    expect(unitTestingTask(format, mockDate)).toBe(expected);
  });

  it.concurrent.each([
    ["A", "PM"],
    ["a", "pm"],
  ])("for format %s should return %s", (format, expected) => {
    const pmHourMockDate = new Date("2022-02-03T15:03:05.005Z");
    expect(unitTestingTask(format, pmHourMockDate)).toBe(expected);
  });
});

describe("unitTestingTask timezone format", () => {
  it.concurrent.each([
    ["ZZ", "+0100"],
    ["Z", "+01:00"],
  ])("for format %s should return time zone in %s format", (format, expected) => {
    expect(unitTestingTask(format, mockDate)).toBe(expected);
  });
});
