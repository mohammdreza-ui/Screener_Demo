
export const sortData = (data: any, sortColumn: any, sortType: any) => {
  if (sortColumn && sortType) {
    return data.sort((a: any, b: any) => {
      const x = a[sortColumn];
      const y = b[sortColumn];
      if (typeof x === 'string') {
        if (sortType === 'asc') {
          return y.localeCompare(x);
        } else {
          return x.localeCompare(y);
        }
      }
      if (sortType === 'asc') {
        return y - x;
      } else {
        return x - y;
      }
    });
  }
  return data;
};

export const simplifyNumber = (number: number) => {
  return Math.abs(Number(number)) >= 1.0e+12
    ? (Math.abs(Number(number)) / 1.0e+12).toFixed(1) + "T"
    : Math.abs(Number(number)) >= 1.0e+9
    ? (Math.abs(Number(number)) / 1.0e+9).toFixed(1) + "B"
    : Math.abs(Number(number)) >= 1.0e+6
      ? (Math.abs(Number(number)) / 1.0e+6).toFixed(1) + "M"
      : Math.abs(Number(number)) >= 1.0e+3
        ? (Math.abs(Number(number)) / 1.0e+3).toFixed(1) + "K"
        : Math.abs(Number(number));
};