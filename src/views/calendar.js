const calendarDiv = document.createElement('div');
const yearDiv = (year) => {
    return `<div id="yearDiv" class="yearDiv"> <h1>${year}</h1></div>`;
}

const monthDiv = (month) => {
    return `<div id="monthDiv" class="monthDiv"> <h1>${month}</h1></div>`;
}

const dateCells = (i = 1) => {
    if (i == 35) return `<button id="cell${35} class="cell"></button>`;
    return `<button id="cell${i} class="cell">${i}</button>` + dateCells(i+1);
}

const yeardiv = yearDiv('2022');
const monthdiv = monthDiv('January');
const datecells = dateCells();
const dateDiv = `<div id="dateDiv" class="dateDiv">${datecells}</div>`;

calendarDiv.innerHTML = yeardiv + monthdiv + dateDiv;