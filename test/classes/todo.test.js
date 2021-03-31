import Todo from '../../src/classes/todo';

let todo = new Todo(2, 'my title', 'my description', '02-January-1920', 'Low', 'myProject');

test('should have an id property', () => {
    expect(todo.hasOwnProperty('id')).toBeTruthy();
})

test('should have a title property', () => {
    expect(todo.hasOwnProperty('title')).toBeTruthy();
})

test('should have a description property', () => {
    expect(todo.hasOwnProperty('description')).toBeTruthy();
})

test('should have a date property', () => {
    expect(todo.hasOwnProperty('date')).toBeTruthy();
})

test('should have a priority property', () => {
    expect(todo.hasOwnProperty('priority')).toBeTruthy();
})

test('should have a project property', () => {
    expect(todo.hasOwnProperty('project')).toBeTruthy();
})

test('the id attribute should be an Integer', () => {
    expect(new Number(todo.id) instanceof Number).toBeTruthy();
})