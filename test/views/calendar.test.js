import calendarDiv from '../../src/views1/calendar'

function isElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;  
}

let spy;
beforeAll(() => {
  spy = jest.spyOn(document, 'getElementById');
});

describe('with found element', () => {
    
    let calendar = calendarDiv();

    beforeEach(() => {
      spy.mockReturnValue(calendar);
    });

    it('should have defined calendarDiv', () => {
        expect(calendar).toBeDefined();
    });    
  
    it('calendar should be an HTML element', () => {
        expect(isElement(calendar)).toBe(true);
    });

    it('should have defined calendar child element', () => {
        let yeardiv = document.querySelector('#yearDiv');
        expect(calendar.children[0]).toBeDefined();
    });

    test('should generate and return a yearDiv element', () => {
        expect(calendar.children[0].classList.contains('yearDiv')).toBe(true);
    });

    test('should generate and return a monthDiv element', () => {
        expect(calendar.children[1].classList.contains('monthDiv')).toBe(true);
    });

    test('should generate and return a yearDiv element', () => {
        expect(calendar.children[2].classList.contains('weekDiv')).toBe(true);
    });

    test('should generate and return a yearDiv element', () => {
        expect(calendar.children[3].classList.contains('dateDiv')).toBe(true);
    });

    test('dateDiv should have 38 button elements', () => {
        let datediv = calendar.children[3];
        expect(datediv.childNodes.length).toEqual(38);
    });
});
