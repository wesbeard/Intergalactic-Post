const { test } = require('@jest/globals')


const sum = require('./sum')
const automationStub = require('./AutomationStub')

const ButtonTypes = {
    SCRAP_GATHER : 'scrap-gather',
    MECHANICAL_GATHER : 'mechanical-gather',
    WIRE_GATHER : 'wire-gather',
    FOOD_GATHER : 'food-gather',
    WATER_GATHER : 'water-gather'
};


//Work in progress

test("Creates an automation robot that accumulates resources idly", () => {
    expect(automationStub("metal")).toBe(5);
    expect(automationStub("food")).toBe(100);
    expect(automationStub("junk")).toBe(null);
});

// Example test
test("Returns 3", () => {
    expect(sum()).toBe(3);
});

