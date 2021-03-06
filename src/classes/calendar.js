function Calendar(year, month) {
  this.year = year;
  this.month = month;
  this.dayone = () => {
    const centuryone = 2;
    const year0Index = year - 1901;
    const leapshift = (year0Index - (year0Index % 4)) / 4;
    const shift = centuryone + year0Index;
    return (shift + leapshift) % 7;
  };
  this.monthObj = () => {
    const dayone = this.dayone();
    return {
      January: [31, dayone],
      February: [year % 4 === 0 ? 29 : 28, (dayone + 3) % 7],
      March: [31, year % 4 === 0 ? (dayone + 4) % 7 : (dayone + 3) % 7],
      April: [30, year % 4 === 0 ? dayone : (dayone + 6) % 7],
      May: [31, year % 4 === 0 ? (dayone + 2) % 7 : (dayone + 1) % 7],
      June: [30, year % 4 === 0 ? (dayone + 5) % 7 : (dayone + 4) % 7],
      July: [31, year % 4 === 0 ? dayone : (dayone + 6) % 7],
      August: [31, year % 4 === 0 ? (dayone + 3) % 7 : (dayone + 2) % 7],
      September: [30, year % 4 === 0 ? (dayone + 6) % 7 : (dayone + 5) % 7],
      October: [31, year % 4 === 0 ? (dayone + 1) % 7 : dayone],
      November: [30, year % 4 === 0 ? (dayone + 4) % 7 : (dayone + 3) % 7],
      December: [31, year % 4 === 0 ? (dayone + 6) % 7 : (dayone + 5) % 7],
    };
  };

  this.monthInfo = () => this.monthObj()[month];

  this.start = () => this.monthInfo()[1];

  this.monthDays = () => this.monthInfo()[0];
}

export { Calendar as default };
