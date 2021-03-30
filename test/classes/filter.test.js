import Filter from '../../src/classes/filter';

let filtered = Filter.allProjects();
const mock = jest.fn();

test('a calendar dayone() property should return the first weekday of the year', () => {
    expect(calend.dayone()).toBe(5);
})

