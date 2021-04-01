import getSelectedOption from '../../src/views1/getoption';

function isElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;
}

let spy;
beforeAll(() => {
  spy = jest.spyOn(document, 'getElementById');
});

describe('with found element', () => {
  const selectorElem = document.createElement('select');
  const option1 = document.createElement('option');
  option1.value = 'option1';
  const option2 = document.createElement('option');
  option2.value = 'option2';

  beforeEach(() => {
    spy.mockReturnValue(selectorElem);
    spy.mockReturnValue(option1);
    spy.mockReturnValue(option2);
    selectorElem.appendChild(option1);
    selectorElem.appendChild(option2);
  });

  it('should have defined calendarDiv', () => {
    expect(selectorElem).toBeDefined();
  });

  it('calendar should be an HTML element', () => {
    expect(isElement(selectorElem)).toBe(true);
  });

  it('should return the selected element', () => {
    option1.selected = true;
    expect(getSelectedOption(selectorElem)).toEqual(selectorElem.children[0]);
  });
});
