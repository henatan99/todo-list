const fillCells = (start, len, dateDivId) => {
  const dateDiv = document.getElementById(dateDivId);
  const dateCells = dateDiv.childNodes;
  for (let i = 1; i <= 38; i += 1) {
    const fill = (i > start && i <= (start + len)) ? i - start : '';
    dateCells[i - 1].innerText = fill;
  }
};

export { fillCells as default };