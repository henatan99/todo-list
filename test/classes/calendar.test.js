const calendar = require('../../src/classes/calendar');

const calend = new Calendar(2021, 'March')

test('a calendar should return the first week day of the year', () => {
    expect(calend.dayOne()).toBe(5);
})
