import Calendar from '../../src/classes/calendar';

const calend = new Calendar(2021, 'March');

test('a calendar dayone() property should return the first weekday of the year', () => {
  expect(calend.dayone()).toBe(5);
});

test('a calendar start() property should return the first weekday of the month in the year', () => {
  expect(calend.start()).toBe(1);
});

test('a calendar monthDays() pproperty should return the first weekday of the month in the year', () => {
  expect(calend.monthDays()).toBe(31);
});
