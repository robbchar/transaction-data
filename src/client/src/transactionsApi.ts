import Papa from "papaparse";

import { CSVData, OrganizedYears } from "./types/DataType";

const organizedData = (data: CSVData[]): OrganizedYears => {
  const organizedData: OrganizedYears = {};

  data.forEach((transaction: CSVData) => {
    const year = transaction["Posted Date"].getFullYear();
    const month = transaction["Posted Date"].getMonth();

    if (organizedData[year] === undefined) {
      organizedData[year] = {};
    }

    if (organizedData[year][month] === undefined) {
      organizedData[year][month] = [];
    }

    organizedData[year][month].push(transaction);
  });

  return organizedData;
};

export const getDataToView = (organizedData: OrganizedYears): CSVData[] => {
  const dataToView: CSVData[] = [];

  Object.keys(organizedData).forEach((yearKey: string) => {
    const year = organizedData[parseInt(yearKey)];
    Object.keys(year).forEach((monthKey: string) => {
      dataToView.push(...year[parseInt(monthKey)]);
    });
  });

  return dataToView;
};

export const getSavedTransactions = async () => {
  const data = await fetch(`/api/get-saved-transactions`)
    .then((response) => response.text())
    .then((responseText) => {
      // -- parse csv
      return Papa.parse<CSVData>(responseText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      }).data;
    });

  // this is supposed to have to happen I can't find how to get papaparse to parse Dates though
  data.forEach((transaction) => transaction["Posted Date"] = transaction["Posted Date"] ? new Date(transaction["Posted Date"]) : transaction["Posted Date"]);

  return organizedData(data);
};

export const saveTransactions = (transactions: CSVData[]) => {
  let csvString = Papa.unparse(transactions);
  fetch(`/api/save-transactions`, {
    method: "PUT",
    body: `{ "contents": "${encodeURIComponent(csvString)}" }`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
