import fillCells from '../../src/views1/fillCells';

const dateCells = () => {
  let dateStr = '';
  for (let i = 1; i <= 38; i += 1) {
    dateStr += `<button id="cell${i}" class="cell"></button>`;
  }
  return dateStr;
};

// fillCells(start, len, dateDivId)

function isElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;
}

let spy;
beforeAll(() => {
  spy = jest.spyOn(document, 'getElementById');
});

describe('with found element', () => {
  const datediv = document.createElement('div');
  datediv.setAttribute('id', 'dateDiv');
  datediv.innerHTML = dateCells();


  beforeEach(() => {
    spy.mockReturnValue(datediv);
  });

  it('should have defined datediv', () => {
    expect(datediv).toBeDefined();
  });

  it('calendar should be an HTML element', () => {
    expect(isElement(datediv)).toBe(true);
  });

  it('should have defined button child element with classname cell', () => {
    expect((datediv.children[0]).classList.contains('cell')).toBeTruthy();
  });

  test('should fil the thrid button ement day 1', () => {
    fillCells(2, 28, 'dateDiv');
    expect((datediv.children[2]).innerText).toEqual(1);
  });

  test('should leave the 30th element empty', () => {
    fillCells(2, 28, 'dateDiv');
    expect((datediv.children[30]).innerText).toEqual('');
  });
});
