import { ContextType, transaction } from "../types/DataType";

export const organizeTheData = (transactions: transaction[]): Map<number, Map<number, transaction[]>> => {
  const organizedData: Map<number, Map<number, transaction[]>> = new Map();

  transactions.forEach((transaction: transaction) => {
    const year = transaction.date.getFullYear();
    const month = transaction.date.getMonth();

    if (organizedData.has(year) === false) {
      organizedData.set(year, new Map());
    }

    const yearMap = organizedData.get(year);
    if (yearMap?.has(month) === false) {
      yearMap.set(month, []);
    }
    yearMap?.get(month)?.push(transaction);
  });

  return organizedData;
};

export const getDataToView = (context: ContextType): transaction[] => {
  const dataToView: transaction[] = [];

  context.organizedData.forEach((monthMap: Map<number, transaction[]>, year: number, yearMap: Map<number, Map<number, transaction[]>>) => {
    monthMap.forEach((transactions: transaction[], month: number, map: Map<number, transaction[]>) => {
      const key = `${month}_${year}`;
      if (!context.monthYearDisabled.hasOwnProperty(key))
        dataToView.push(...transactions);

      if (context.monthYearDisabled[key] === false) {
        dataToView.push(...transactions);
      }
    });
  });

  return dataToView;
};

export const updateMonthYearDisabled = (isDisabled: boolean, month: number, year: number, context: ContextType) => {
  const key = `${month}_${year}`;

  context.monthYearDisabled[key] = isDisabled;
};

export const formatPrice = (price: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(price);
};

export const formatDate = (date: Date): string => {
  const d = new Date(date),
    year = d.getFullYear();
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [month, day, year].join('/');
}