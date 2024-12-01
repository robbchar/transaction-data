import { ContextType, transaction } from "./types/DataType";

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