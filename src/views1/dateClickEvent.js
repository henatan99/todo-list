import { el } from 'date-fns/locale';
import getSelectedOption from './getoption';

const date = () => {
    const selectMonth = document.getElementById("selectMonth");
    const selectYear = document.getElementById("selectYear");
    const dateBtn = document.getElementById("dateDiv");
    dateBtn.getAttribute('name', 'datediv');

    const dateVal = {'year': '', 'month': '', 'day': ''};
    dateBtn.addEventListener('click', (event) => {       
        const elem = event.target;
        if (elem.classList.contains('cell') && elem.innerText != '') {
            const month = getSelectedOption(selectMonth).value;
            const year = getSelectedOption(selectYear).value;
            dateVal['day'] = elem.innerText;
            dateVal['month'] = month;
            dateVal['year'] = year;
            dateBtn.value = `${dateVal['day']}-${dateVal['month']}-${dateVal['year']}`;
            alert(dateBtn.value);                                  
        }        
    });    
}

export {date as default};