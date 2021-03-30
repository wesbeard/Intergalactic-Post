const { test } = require('@jest/globals')
//const createAutomationRobot = require("./Crash-site")
//const ButtonTypes = require('./Crash-site')
const sum = require('./sum')

//Work in progress
/*
test("Creates an automation robot that accumulates resources idly", () => {
    var expected = "metal gather";
    var actual = createAutomationRobot(ButtonTypes.SCRAP_GATHER);
    expect(expected).toBe(actual);
});
*/
// Example test
test("Returns 3", () => {
    expect(sum()).toBe(3);
});

