interface CSVData {
  "Posted Date": Date;
  "Reference Number": number;
  Payee: string;
  Address: string;
  Amount: string;
  Category: string;
}

export type DataType = {
  data: CSVData[];
};
