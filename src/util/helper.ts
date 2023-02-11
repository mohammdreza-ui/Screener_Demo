

export const sortData = (data: any, sortColumn: any, sortType: any, defaultColumns:any) => {

  if (sortColumn && sortType) {
    const data2 = data.filter((item: any) => {
      const list:any = [];
      for (let i = 0; i < defaultColumns.length; i++) {
        const column = defaultColumns[i];
        if (!column.filters.filter) {
          list.push(true);
        }
        else if (column.filters.filterType == "compare") {
          if (column.filters.filterMode == "above") {
            list.push(item[column.key] > parseFloat(column.filters.filterValue0));
          }
          if (column.filters.filterMode == "below") {
            console.log(item[column.key], parseFloat(column.filters.filterValue0));
            list.push(item[column.key] < parseFloat(column.filters.filterValue0));
          }
          if (column.filters.filterMode == "between") {
            list.push(parseFloat(column.filters.filterValue0) < item[column.key] && item[column.key] < parseFloat(column.filters.filterValue1));
          }
        } else {
          list.push(true);
        }
      }
      return list.reduce((a: boolean, b: boolean) => a && b, true);
    
    });

    return data2.sort((a: any, b: any) => {
      const x = a[sortColumn];
      const y = b[sortColumn];
      if (typeof x === 'string') {
        if (sortType === 'asc') { 
          if (x > y) {
            return -1;
          } else {
            return 1;
          }
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