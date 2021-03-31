import calendarDIv from '../../src/views1/calendar'


test('should generate and return a project item element', () => {
    expect(calendarDIv).toBe(true);
});

test('should generate and return a project item element', () => {
    expect(calendarDIv.children[0].classList.contains('yearDiv')).toBe(true);
});
