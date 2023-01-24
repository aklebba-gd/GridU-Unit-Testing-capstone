const unitTestingTask = require("../unitTestingTask");

describe("unitTestingTask", () => {
  const mockDate = new Date("March 13, 08 04:20");

  it("should throw an error if called with no arguments", () => {
    expect(() => unitTestingTask()).toThrow("Argument `format` must be a string");
  });

  it("should throw an error if called with empty string as first argument  (format)", () => {
    expect(() => unitTestingTask("", mockDate)).toThrow("Argument `format` must be a string");
  });

  it("should throw an error if called with number as first argument  (format)", () => {
    expect(() => unitTestingTask(42, mockDate)).toThrow("Argument `format` must be a string");
  });

  it("should throw an error if called with object as first argument (format)", () => {
    expect(() => unitTestingTask({ string: "randomString" }, mockDate)).toThrow(
      "Argument `format` must be a string"
    );
  });

  it("should not throw an error if called with string as first argument (format)", () => {
    expect(() => unitTestingTask("en", mockDate)).not.toThrow("Argument `format` must be a string");
  });

  it("should not throw an error if called without second argument (date)", () => {
    expect(() => unitTestingTask("YY")).not.toThrow();
  });

  it("should throw an error if called with object as second argument (date)", () => {
    expect(() => unitTestingTask("YY", { name: "someName" })).toThrow();
  });
});

describe("unitTestingTask with en language", () => {
  beforeAll(() => {
    unitTestingTask.lang("en");
  });

  const mockDate = new Date("2022-02-03T06:03:05.005Z");

  it("should have en as current language", () => {
    expect(unitTestingTask.lang()).toBe("en");
  });

  it("should return full year", () => {
    expect(unitTestingTask("YYYY", mockDate)).toBe("2022");
  });

  it("should return last 2 digits of the year", () => {
    expect(unitTestingTask("YY", mockDate)).toBe("22");
  });

  it("should return full name of the month", () => {
    expect(unitTestingTask("MMMM", mockDate)).toBe("February");
  });

  it("should return short name of the month", () => {
    expect(unitTestingTask("MMM", mockDate)).toBe("Feb");
  });

  it("should return 2-digit month", () => {
    expect(unitTestingTask("MM", mockDate)).toBe("02");
  });

  it("should return digit of the month", () => {
    expect(unitTestingTask("M", mockDate)).toBe("2");
  });

  it("should return full name of the day", () => {
    expect(unitTestingTask("DDD", mockDate)).toBe("Thursday");
  });

  it("should return first 3 letters of the day name", () => {
    expect(unitTestingTask("DD", mockDate)).toBe("Thu");
  });

  it("should return first 2 letters of the day name", () => {
    expect(unitTestingTask("D", mockDate)).toBe("Th");
  });

  it("should return always 2-digits number of the day", () => {
    expect(unitTestingTask("dd", new Date(2022, 1, 1))).toBe("01");
  });

  it("should return number of the day", () => {
    expect(unitTestingTask("d", new Date(2022, 1, 1))).toBe("1");
  });

  it("should return always 2-digits hour", () => {
    expect(unitTestingTask("HH", mockDate)).toBe("07");
  });

  it("should return hour", () => {
    expect(unitTestingTask("H", mockDate)).toBe("7");
  });

  it("should return always 2-digit hour in 12 hour format", () => {
    expect(unitTestingTask("hh", new Date("2022-02-03T18:03:05.005Z"))).toBe("07");
  });

  it("should return hour in 12 hour format", () => {
    expect(unitTestingTask("h", new Date("2022-02-03T18:03:05.005Z"))).toBe("7");
  });

  it("should return always 2-digit minute", () => {
    expect(unitTestingTask("mm", mockDate)).toBe("03");
  });

  it("should return minute", () => {
    expect(unitTestingTask("m", mockDate)).toBe("3");
  });

  it("should return always 2-digit second", () => {
    expect(unitTestingTask("ss", mockDate)).toBe("05");
  });

  it("should return second", () => {
    expect(unitTestingTask("s", mockDate)).toBe("5");
  });

  it("should return always 3-digit milisecond", () => {
    expect(unitTestingTask("ff", mockDate)).toBe("005");
  });

  it("should return milisecond", () => {
    expect(unitTestingTask("f", mockDate)).toBe("5");
  });

  it("should return 'AM' if it's before noon and 'PM' otherwise", () => {
    expect(unitTestingTask("A", mockDate)).toBe("AM");
  });

  it("should return 'am' if it's before noon and 'pm' otherwise", () => {
    expect(unitTestingTask("a", mockDate)).toBe("am");
  });

  it("should return time zone in '+0100' format", () => {
    expect(unitTestingTask("ZZ", mockDate)).toBe("+0100");
  });

  it("should return time zone in '+01:00' format", () => {
    expect(unitTestingTask("Z", mockDate)).toBe("+01:00");
  });
});
