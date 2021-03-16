import Calendar from '../classes/calendar';
import getSelectedOption from './getoption';

const createElem = (tag, name) => {
    let elem = document.createElement(tag);
    elem.classList.add(name);
    elem.setAttribute('id', name);
    return elem;
}

const elems = (i=0, optElem, tag) => {
    if (i == optElem.length - 1) return `<${tag} value="${optElem[optElem.length - 1]}" id="${optElem[optElem.length - 1]}" class="${optElem[optElem.length - 1]}">${optElem[optElem.length - 1]}</${tag}>`;
    return `<${tag} value="${optElem[i]}" id="${optElem[i]}" class="${optElem[i]}">${optElem[i]}</${tag}>` + elems(i+1, optElem, tag);
}

const years = [2020, 2021, 2022, 2023, 2024, 2025];
const weeks = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const yearOptions = elems(0, years, 'option');
const monthOptions = elems(0, months, 'option');
const weekBtns = elems (0, weeks, 'button');


const selectYear = createElem('select', 'selectYear');
selectYear.innerHTML = yearOptions;
const selectMonth = createElem('select', 'selectMonth');
selectMonth.innerHTML = monthOptions;

const yearDiv = createElem('div', 'yearDiv');
yearDiv.appendChild(selectYear);
const monthDiv = createElem('div', 'monthDiv');
monthDiv.appendChild(selectMonth);
const weekDiv = createElem('div', 'weekDiv');
weekDiv.innerHTML = weekBtns;

// var yearText = $('#selectYear').find(":selected").text();
// var year = parseInt(yearText);
// var month = $('#selectMonth').find(":selected").text();

// const yearText = getSelectedOption(selectYear);
// const month = getSelectedOption(selectMonth);


const dateCells = (start, len) => {    
    let dateStr = '';
    for(let i=1; i <= 35; i+=1) {
        let fill = (i > start && i <= (start + len)) ? i - start : '';
        dateStr += `<button id="cell${i}" class="cell">${fill}</button>`;
    }
    const dateDiv = createElem('div', 'dateDiv');
    dateDiv.innerHTML = dateStr;
    return dateDiv;
}

const calendarDiv = (start, len) => {
    const calendarDiv = createElem('div', 'calendar');
    calendarDiv.appendChild(yearDiv);
    calendarDiv.appendChild(monthDiv);
    calendarDiv.appendChild(weekDiv);
    calendarDiv.appendChild(dateCells(start, len));
    return calendarDiv;
}

export {calendarDiv as default};
