import Calendar from '../classes/calendar';

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

const dateCells = (i = 1) => {
    if (i == 35) return `<button id="cell${35}" class="cell"></button>`;
    return `<button id="cell${i}" class="cell"></button>` + dateCells(i+1);
}

const weekDiv = (i=0, week) => {
    if (i == 6) return `<button id="${week[6]}" class="week">${week[6]}</button>`;
    return `<button id="${week[i]}" class="week">${week[i]}</button>` + weekDiv(i+1, week);
}

const yeardiv = yearDiv(years);
const monthdiv = monthDiv(months);
const weekdiv = weekDiv(0, week);
const datecells = dateCells();
const dateDiv = `<div id="dateDiv" class="dateDiv">${datecells}</div>`;

let yearSelect = document.querySelector('selectYear');
let yearMonth = document.querySelector('selectMonth');

var selectYear = $('#selectYear').find(":selected").text();
var selectMonth = $('#selectMonth').find(":selected").text();

const calendar = new Calendar(selectYear, selectMonth);
const monthObj = calendar.monthObj();

const filldateCells = (calendar) => {
    let month = calendar.month;
    let month_info = calendar.monthObj(month);
    let start = month_info[1];
    const length = month_info[0];
    for (let i=0; i<length; i+=1) {
        let cell = document.getElementById(`cell${start+i}`);
        cell.innerText = "i+1";
    }
}

filldateCells(calendar);

const calendarDiv = `<div id="calendar" class="calendar"> ${yeardiv}${monthdiv}${weekdiv}${dateDiv}</div>`;

export {calendarDiv as default};