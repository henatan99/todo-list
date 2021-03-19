import Calendar from '../classes/calendar';
import toDay from '../classes/timenow';
import fillCells from './fillCells';

const defaultCal = () => {
  const toDate = toDay().split('/');
  const pseudocal = new Calendar(2020, 'January');
  const months = Object.keys(pseudocal);
  const month = months[toDate[1] - 1];
  const year = toDate[2];
  // const date = toDate[0];
  const calendar = new Calendar(year, month);
  fillCells(calendar.start(), calendar.monthDays(), 'dateDiv');
};

export { defaultCal as default };