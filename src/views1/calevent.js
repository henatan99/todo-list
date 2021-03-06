import Calendar from '../classes/calendar';
import getSelectedOption from './getoption';
import fillCells from './fillCells';

const calendarEvent = () => {
  const selectMonth = document.getElementById('selectMonth');
  const selectYear = document.getElementById('selectYear');

  selectMonth.addEventListener('change', (event) => {
    const month = event.target.value;
    const year = getSelectedOption(selectYear).value;
    const calendar = new Calendar(year, month);
    fillCells(calendar.start(), calendar.monthDays(), 'dateDiv');
  });

  selectYear.addEventListener('change', (event) => {
    const year = event.target.value;
    const month = getSelectedOption(selectMonth).value;
    const calendar = new Calendar(year, month);
    fillCells(calendar.start(), calendar.monthDays(), 'dateDiv');
  });
};

export { calendarEvent as default };
