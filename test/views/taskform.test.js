import taskformDiv from '../../src/views1/taskform';

function isElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;
}

let spy;
beforeAll(() => {
  spy = jest.spyOn(document, 'getElementById');
});

describe('with found element', () => {
  const taskform = taskformDiv(['pr1', 'pr2'], ['low', 'high']);

  beforeEach(() => {
    spy.mockReturnValue(taskform);
  });

  it('should have defined calendarDiv', () => {
    expect(taskform).toBeDefined();
  });

  it('should be an HTML element', () => {
    expect(isElement(taskform)).toBe(true);
  });

  it('should have a child with class formwrapper', () => {
    expect(taskform.children[0].classList.contains('formwrapper')).toBe(true);
  });

  it('should have a first grandchild with class tite', () => {
    expect((taskform.children[0]).children[1].classList.contains('project-select')).toBe(true);
  });
});
