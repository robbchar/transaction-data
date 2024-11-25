import { ContextType, CSVData } from "./types/DataType";

export const organizeTheData = (data: CSVData[]): Map<number, Map<number, CSVData[]>> => {
  const organizedData: Map<number, Map<number, CSVData[]>> = new Map();

  data.forEach((transaction: CSVData) => {
    const year = transaction['Posted Date'].getFullYear();
    const month = transaction['Posted Date'].getMonth();

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

export const getDataToView = (context: ContextType): CSVData[] => {
  const dataToView: CSVData[] = [];

  context.organizedData.forEach((monthMap: Map<number, CSVData[]>, year: number, yearMap: Map<number, Map<number, CSVData[]>>) => {
    monthMap.forEach((transactions: CSVData[], month: number, map: Map<number, CSVData[]>) => {
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