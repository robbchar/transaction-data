export interface CSVData {
  "Posted Date": Date;
  "Reference Number": number | string;
  Payee: string;
  Address: string;
  Amount: string;
  Category: string;
}

export function getTransactionById(
  id: number,
  data: CSVData[]
): CSVData | null {
  let oldTransaction = null;
  data.forEach((transaction) => {
    if (transaction["Reference Number"] === id) {
      oldTransaction = transaction;
    }
  });
  return oldTransaction;
}
