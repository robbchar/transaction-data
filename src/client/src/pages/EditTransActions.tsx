import { useContext, useState } from 'react';
import styled from 'styled-components';

import DataContext from '../DataContext.tsx';
import { transaction, getTransactionById } from '../types/DataType.ts';
import { saveTransactions } from '../transactionsApi.ts';
import Categories from '../components/Categories.tsx';

const TransactionUl = styled.ul`
  padding: 0;
`
const TransactionLI = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.1rem;
  > div:nth-child(2) {
    flex: 1;
  }
  > div:nth-child(3) {
    margin-right: 1rem;
  }
  > div:nth-child(4) {
    div {
      display: flex;
      position: relative;
      justify-content: space-between;
      button {
        width:15rem;
        margin: auto;
      }
    }
  }
`;

const formatPrice = (price: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(price);
};

export default function EditTransactions() {
  const context = useContext(DataContext);
  const [data, setData] = useState<transaction[]>(context.originalData);

  const loadNewTransactions = async () => {
    const newData: transaction[] = await fetch(`/api/get-original-transactions`)
      .then(response => response.text())
      .then(responseText => JSON.parse(responseText));

    newData.forEach(newTransaction => {
      if (newTransaction.id.trim() === '') return;

      const oldTransaction = getTransactionById(
        newTransaction.id,
        context.originalData,
      );
      if (oldTransaction === null) {
        context.originalData.push(newTransaction);
        return;
      }

      oldTransaction.amount = newTransaction.amount;
      oldTransaction.description = newTransaction.description;
      oldTransaction.date = newTransaction.date;
    });

    setData([...context.originalData]);
    saveTransactions(context.originalData);
  };

  return (
    <>
      {!data ? (
        <span>data did not load</span>
      ) : (
        <div>
          <h2>Transactions to manage:</h2>
          <TransactionUl>
            {context.dataToView.map((transaction, index) => (
              <TransactionLI key={index}>
                <div>
                  Posted Date:{' '}
                  {`${transaction.date.getDay()}\\${transaction.date.getMonth()}\\${transaction.date.getFullYear()}`}
                </div>
                <div>Payee: {transaction.description}</div>
                <div>Amount: {formatPrice(transaction.amount)}</div>
                <div>
                  <Categories
                    chosenCategoryLabel={transaction.category ?? ''}
                    open={false}
                    setOpen={() => { }}
                    categoryChosen={(newCategoryLabel: string) => {
                      transaction.category = newCategoryLabel;
                      saveTransactions(context.originalData);
                    }}
                  ></Categories>
                </div>
              </TransactionLI>
            ))}
          </TransactionUl>
          <button onClick={loadNewTransactions}>Load new transactions.</button>
        </div>
      )}
    </>
  );
}
