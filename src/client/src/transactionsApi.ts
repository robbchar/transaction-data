import Papa from 'papaparse';

import { CSVData } from './types/DataType';
import { get } from 'http';

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

export const getDataToView = (organizedData: Map<number, Map<number, CSVData[]>>): CSVData[] => {
  const dataToView: CSVData[] = [];

  organizedData.forEach((monthMap: Map<number, CSVData[]>, year: number, yearMap: Map<number, Map<number, CSVData[]>>) => {
    monthMap.forEach((transactions: CSVData[], monthh: number, map: Map<number, CSVData[]>) => {
      dataToView.push(...transactions);
    });
  });

  return dataToView;
};

export const getSavedTransactions = async (): Promise<CSVData[]> => {
  const data = await fetch(`/api/get-saved-transactions`)
    .then(response => response.text())
    .then(responseText => {
      // -- parse csv
      return Papa.parse<CSVData>(responseText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      }).data;
    });

  // this isn't supposed to have to happen I can't find how to get papaparse to parse Dates though
  data.forEach(
    transaction =>
    (transaction['Posted Date'] = transaction['Posted Date']
      ? new Date(transaction['Posted Date'])
      : transaction['Posted Date']),
  );

  return data;
};

export const saveTransactions = (transactions: CSVData[]) => {
  let csvString = Papa.unparse(transactions);
  fetch(`/api/save-transactions`, {
    method: 'PUT',
    body: `{ "contents": "${encodeURIComponent(csvString)}" }`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
