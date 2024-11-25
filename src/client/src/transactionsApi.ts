import Papa from 'papaparse';

import { CSVData } from './types/DataType';

export const getSavedTransactions = async (): Promise<CSVData[]> => {
  const data = await fetch(`/api/get-saved-transactions`)
    .then(response => response.text())
    .then(responseText => {
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
