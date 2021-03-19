function getSelectedOption(sel) {
  let opt;
  for (let i = 0, len = sel.options.length; i < len; i += 1) {
    opt = sel.options[i];
    if (opt.selected === true) {
      break;
    }
  }
  return opt;
}

export { getSelectedOption as default };