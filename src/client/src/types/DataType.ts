export interface CSVData {
  'Posted Date': Date;
  'Reference Number': number | string;
  Payee: string;
  Address: string;
  Amount: number;
  Category: string;
}

export function getTransactionById(
  id: number,
  data: CSVData[],
): CSVData | null {
  let oldTransaction = null;
  data.forEach(transaction => {
    if (transaction['Reference Number'] === id) {
      oldTransaction = transaction;
    }
  });
  return oldTransaction;
}

export enum Category {
  Mortgage = 'Mortgage',
  Internet = 'Internet',
  CarPayment = 'Car payment',
  CarCharging = 'Car Charging',
  Groceries = 'Groceries',
  EatingOut = 'Eating out',
  EatingIn = 'Eating In',
  AlcoholBars = 'Alcohol/Bars',
  Pet_Food = 'Pet - Food',
  Pet_Boarding = 'Pet - Boarding',
  Pet_Grooming = 'Pet - Grooming',
  Pet_Misc = 'Pet - Misc',
  Pet_Vet = 'Pet - Vet',
  Electricity = 'Electricity',
  Phone = 'Phone',
  Medical = 'Medical',
  Medicine = 'Medicine',
  Insurance = 'Insurance',
  Clothes = 'Clothes',
  Miscelaneous = 'Miscelaneous',
  Salon = 'Salon',
  LoansFinance = 'Loans/Finance',
  Gifts = 'Gifts',
  Games = 'Games',
  Movies = 'Movies',
  Concerts = 'Concerts',
  Subscriptions = 'Subscriptions',
  Entertainment = 'Entertainment',
  TaxiLyft = 'Taxi/Lyft',
  Hotel = 'Hotel',
  'Mystery Transaction' = 'Mystery Transaction',
}

export type TransactionCategories = {
  [key in Category]?: number;
};

// export type OrganizedMonths = {
//   [month: number]: CSVData[];
// };

// interface IOrganizedYears {
//   [year: number]: OrganizedMonths;
// };
// export type OrganizedYears  = {
//   [K: number in keyof IOrganizedYears]: IOrganizedYears[K]
// };

export type ContextType = {
  originalData: CSVData[];
  organizedData: Map<number, Map<number, CSVData[]>>//OrganizedYears;
  dataToView: CSVData[];
};
