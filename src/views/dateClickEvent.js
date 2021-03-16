import { el } from 'date-fns/locale';
import getSelectedOption from './getoption';

const date = () => {
    const selectMonth = document.getElementById("selectMonth");
    const selectYear = document.getElementById("selectYear");
    const dateBtn = document.getElementById("dateDiv");

    const dateVal = {'year': '', 'month': '', 'day': ''};
    dateBtn.addEventListener('click', (event) => {       
        const elem = event.target;        
        const month = getSelectedOption(selectMonth).value;
        const year = getSelectedOption(selectYear).value;
        dateVal['day'] = elem.innerText;
        dateVal['month'] = month;
        dateVal['year'] = year;
        alert (`year: ${dateVal['year']}, month: ${dateVal['month']}, ${dateVal['day']}`);
    });
}

export {date as default};