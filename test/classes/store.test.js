import Store from '../../src/classes/store';
import Todo from '../../src/classes/todo';

const todo1 = new Todo(1, 'title1', 'dsc1', '01-January-2005', 'high', 'project1');
const todo2 = new Todo(2, 'title2', 'dsc2', '01-February-2005', 'low', 'project2');
const todo3 = new Todo(3, 'title3', 'dsc3', '01-March-2005', 'low', 'project3');

test('should add the token to localStorage with addTodo() property', () => {
  Store.addTodo(todo1);
  const todos = Store.getTodos();
  expect(todos[todos.length - 1]).toEqual(todo1);
});

test('should add the token to localStorage with addTodo() property', () => {
  Store.addTodo(todo2);
  const todos = Store.getTodos();
  expect(todos.length).toEqual(2);
});

test('should edit the todo in localStorage with the editTodo() property', () => {
  const todo2edited = new Todo(2, 'title2edit', 'dsc2edit', '01-February-2005', 'low', 'project2edit');
  Store.editTodo(2, 'title2edit', 'dsc2edit', '01-February-2005', 'low', 'project2edit');
  const todos = Store.getTodos();
  expect(todos[1]).toEqual(todo2edited);
});

test('should remove todo from localStorage with removeTodo() property', () => {
  Store.addTodo(todo3);
  Store.removeTodo(2);
  const todos = Store.getTodos();
  expect(todos[1]).toEqual(todo3);
});
