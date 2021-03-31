import calendarDiv from '../../src/views1/calendar'

function isElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;  
}

let spy;
beforeAll(() => {
  spy = jest.spyOn(document, 'getElementById');
});

describe('with found element', () => {
    let mockElement;
    let calendar = calendarDiv();

    beforeEach(() => {
      mockElement = document.createElement('div');
      spy.mockReturnValue(mockElement, calendar);
    });

    it('should have defined mockElement', () => {
      expect(mockElement).toBeDefined();
    });

    it('should have defined calendarDiv', () => {
        expect(calendar).toBeDefined();
    });
    
    it('mockElement should be an element', () => {
        expect(isElement(mockElement)).toBe(true);
    });

    it('should have defined calendarDiv element', () => {
        // mockElement.innerHTML = calendarDIv;
        expect(isElement(calendar)).toBe(true);
    });

    // it('should have defined calendarDiv element', () => {
    //     expect(calendarDIv).toBeDefined();
    // });

    // it('should have defined calendarDiv element', () => {
    //     let yeardiv = document.querySelector('#yearDiv');
    //     expect(calendarDIv.children[0]).toBeDefined();
    // });

    // test('should generate and return a yearDiv element', () => {
    //     expect(calendarDIv.children[0].classList.contains('yearDiv')).toBe(true);
    // });
});
