const fillCells = (start = 5, len = 29, dateDivId) => {
    let dateDiv = document.getElementById(dateDivId);
    let dateCells = dateDiv.childNodes;
    for(let i=1; i <= 38; i+=1) {
        let fill = (i > start && i <= (start + len)) ? i - start : '';
        dateCells[i-1].innerText = fill;
    }
}

export {fillCells as default};