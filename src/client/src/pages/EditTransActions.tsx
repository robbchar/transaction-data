import { useContext, useState } from 'react';
import styled from 'styled-components';

import DataContext from '../DataContext.tsx';
import { transaction, getTransactionById } from '../types/DataType.ts';
import { saveTransactions } from '../transactionsApi.ts';
import Categories from '../components/Categories.tsx';
import { formatDate, formatPrice } from '../utilities/functions.ts';

const TransactionUl = styled.ul`
  padding: 0;
`
const TransactionLI = styled.li`
  list-style: none;
  display: flex;
  gap: 1rem;
  padding-bottom: 0.1rem;
  > div:nth-child(3) {
    flex: 1;
  }
  > div:nth-child(4) {
    margin-right: 1rem;
  }
  > div:nth-child(5) {
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

export default function EditTransactions() {
  const context = useContext(DataContext);
  const [data, setData] = useState<transaction[]>(context.originalData);
  const [accountType, setAccountType] = useState<string>('');

  const loadNewTransactions = async () => {
    if (!accountType || accountType === 'select') return

    const newData: transaction[] = await fetch(`/api/get-original-transactions/${accountType}`)
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
          <h2>Transactions to manage: ({context.originalData.length})</h2>
          <TransactionUl>
            {context.originalData.map((transaction, index) => (
              <TransactionLI key={index}>
                <div>
                  {`${formatDate(transaction.date)}`}
                </div>
                <div>Account: {transaction.account}</div>
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
          <select name="accountType" id="accountType" onChange={(e) => setAccountType(e.target.value)}>
            <option value="select">Select an Account</option>
            <option value="fibre">fibre</option>
            <option value="BOA">BOA</option>
          </select>
        </div>
      )}
    </>
  );
}
