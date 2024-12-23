// import Papa from 'papaparse';

import { transaction } from './types/DataType';

export const getSavedTransactions = async (): Promise<transaction[]> => {
  const transactions: transaction[] = await fetch(`/api/get-saved-transactions`)
    .then(response => response.text())
    .then(responseText =>
      responseText === '' ? [] : JSON.parse(responseText),
    );

  transactions.forEach(transaction => {
    transaction.date = transaction.date
      ? new Date(transaction.date)
      : transaction.date;

    transaction.amount = parseInt('' + transaction.amount);
  });

  return transactions;
};

export const saveTransactions = (transactions: transaction[]) => {
  const sortedTransactions = transactions.sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );

  fetch(`/api/save-transactions`, {
    method: 'PUT',
    body: JSON.stringify(sortedTransactions),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
