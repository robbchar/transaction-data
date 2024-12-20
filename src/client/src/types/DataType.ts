export interface transaction {
  date: Date;
  description: string;
  amount: number;
  category?: string;
  account?: string;
  id: string;
}

export function getTransactionById(
  id: string,
  data: transaction[],
): transaction | null {
  let oldTransaction = null;
  data.forEach(transaction => {
    if (transaction.id === id) {
      oldTransaction = transaction;
    }
  });
  return oldTransaction;
}

export enum Category {
  Income = 'Income',
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

export type TransactionCategoriesAmounts = {
  [key in Category]?: number;
};

export type TransactionCategoriesTransactions = {
  [key in Category]?: Array<transaction>;
};

export enum GroupByEnum {
  Type = 'Type',
  Category = 'Category'
}

export type GroupByItemsAmounts = {
  [key in GroupByEnum]?: number;
};

export type GroupByItemsTransactions = {
  [key in Category]?: Array<transaction>;
};

export type MonthYearDisabledType = {
  [key: string]: boolean;
};

export type ContextType = {
  originalData: transaction[];
  organizedData: Map<number, Map<number, transaction[]>>//OrganizedYears;
  dataToView: transaction[];
  monthYearDisabled: MonthYearDisabledType;
};
