
import Calendar from '../classes/calendar';
import getSelectedOption from './getoption';

const week = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const year = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const yearOptions = (i=0, year) => {
    if (i == 9) return `<option value="${year[9]}" >${year[9]}</option>`;
    return `<option value="${year[i]}" >${year[i]}</option>` + yearOptions(i+1, year);
}

const years = yearOptions(0, year);
const yearDiv = (years) => {
    return `<div id="yearDiv" class="yearDiv"> <select id="selectYear">${years}</select></div>`;
}

const monthOptions = (i=0, month) => {
    if (i == 11) return `<option value="${month[11]}" >${month[11]}</option>`;
    return `<option value="${month[i]}" >${month[i]}</option>` + monthOptions(i+1, month);
}

const monthKeys = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const months = monthOptions(0, monthKeys);
const monthDiv = (months) => {
    return `<div id="monthDiv" class="monthDiv"> <select>${months}</select></div>`;
}

const dateCells = (start, len) => {    
    let dateStr = '';
    for(let i=1; i <= 35; i+=1) {
        let fill = (i > start && i <= (start + len)) ? i - start : '';
        dateStr += `<button id="cell${i}" class="cell">${fill}</button>`;
    }
    return dateStr;
}


const weekDiv = (i=0, week) => {
    if (i == 6) return `<button id="${week[6]}" class="week">${week[6]}</button>`;
    return `<button id="${week[i]}" class="week">${week[i]}</button>` + weekDiv(i+1, week);
}

var selectYearText = $('#selectYear').find(":selected").text();
var selectYear = parseInt(selectYearText);
var selectMonth = $('#selectMonth').find(":selected").text();

const calendar = new Calendar(1955, 'February');
const start = calendar.start();
const len = calendar.monthDays();


const yeardiv = yearDiv(years);
const monthdiv = monthDiv(months);
const weekdiv = weekDiv(0, week);
const datecells = dateCells(start, len);
const dateDiv = `<div id="dateDiv" class="dateDiv">${datecells}</div>`;

const calendarDiv = `<div id="calendar" class="calendar"> ${yeardiv}${monthdiv}${weekdiv}${dateDiv}</div>`;

export {calendarDiv as default};