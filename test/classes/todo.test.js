import Todo from '../../src/classes/todo';

const todo = new Todo(2, 'my title', 'my description', '02-January-1920', 'Low', 'myProject');

test('should have an id property', () => {
  expect(Object.prototype.hasOwnProperty.call(todo, 'id')).toBeTruthy();
});

test('should have a title property', () => {
  expect(Object.prototype.hasOwnProperty.call(todo, 'title')).toBeTruthy();
});

test('should have a description property', () => {
  expect(Object.prototype.hasOwnProperty.call(todo, 'description')).toBeTruthy();
});

test('should have a date property', () => {
  expect(Object.prototype.hasOwnProperty.call(todo, 'date')).toBeTruthy();
});

test('should have a priority property', () => {
  expect(Object.prototype.hasOwnProperty.call(todo, 'priority')).toBeTruthy();
});

test('should have a project property', () => {
  expect(Object.prototype.hasOwnProperty.call(todo, 'project')).toBeTruthy();
});
