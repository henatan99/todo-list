import Calendar from '../classes/calendar';
import toDay from '../classes/timenow';
const defaultCal = () => {
    let toDate = toDay().split('/');
    let pseudocal = new Calendar(2020, 'January');
    let months = Object.keys(pseudocal);
    let month = months[toDate[1]-1];
    let year = toDate[2];
    let date = toDate[0];
    let calendar = new Calendar(year, month);
    let fillcells = fillCells(calendar.start(), calendar.monthDays(), 'dateDiv');
}

export {defaultCal as default};