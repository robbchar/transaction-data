// import Papa from 'papaparse';

import { transaction } from './types/DataType';

export const getSavedTransactions = async (): Promise<transaction[]> => {
  const transactions: transaction[] = await fetch(`/api/get-saved-transactions`)
    .then(response => response.text())
    .then(responseText => responseText === '' ? [] : JSON.parse(responseText));

  transactions.forEach(
    transaction =>
    (transaction.date = transaction.date
      ? new Date(transaction.date)
      : transaction.date),
  );

  return transactions;
};

export const saveTransactions = (transactions: transaction[]) => {
  fetch(`/api/save-transactions`, {
    method: 'PUT',
    body: JSON.stringify(transactions),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
