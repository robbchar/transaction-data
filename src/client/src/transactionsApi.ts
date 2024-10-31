import Papa from "papaparse";

import { CSVData } from "./types/DataType";

export const getSavedTransactions = () =>
  fetch(`/api/get-saved-transactions`)
    .then((response) => response.text())
    .then((responseText) => {
      // -- parse csv
      return Papa.parse<CSVData>(responseText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      }).data;
    });

export const saveTransactions = (transactions: CSVData[]) => {
  let csvString = Papa.unparse(transactions);
  console.log(`csvString: ${csvString}`);
  console.log(
    `encodeURIComponent(csvString): ${encodeURIComponent(csvString)}`
  );
  fetch(`/api/save-transactions`, {
    method: "PUT",
    body: `{ "contents": "${encodeURIComponent(csvString)}" }`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
