import { useContext, useState } from "react";
import Papa from "papaparse";
import { styled } from "styled-components";

import DataContext from "../DataContext.tsx";
import { CSVData, getTransactionById } from "../types/DataType.ts";
import { saveTransactions } from "../transactionsApi.ts";
import Categories from "../components/Categories.tsx";

const TransactionLI = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
`;

const formatPrice = (price: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};

export default function EditTransactions() {
  const context = useContext(DataContext);
  const [data, setData] = useState<CSVData[]>(context);

  const loadNewTransactions = async () => {
    const newData = await fetch(`/api/get-original-transactions`)
      .then((response) => response.text())
      .then((responseText) => {
        // -- parse csv
        return Papa.parse<CSVData>(responseText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
      });

    newData.data.forEach((newTransaction) => {
      if (
        (newTransaction["Reference Number"] as string) &&
        (newTransaction["Reference Number"] as string).trim() === ""
      )
        return;
      const oldTransaction = getTransactionById(
        newTransaction["Reference Number"] as number,
        context
      );
      if (oldTransaction === null) {
        context.push(newTransaction);
        return;
      }

      oldTransaction.Amount = newTransaction.Amount;
      oldTransaction.Payee = newTransaction.Payee;
      oldTransaction["Posted Date"] = newTransaction["Posted Date"];
    });

    setData([...context]);
    saveTransactions(context);
  };

  return (
    <>
      {!context ? (
        <span>data did not load</span>
      ) : (
        <div>
          <h2>Transactions to manage:</h2>
          <ul>
            {context.map((transaction, index) => (
              <TransactionLI key={index}>
                <div>Posted Date: {transaction["Posted Date"].toString()}</div>
                <div>Payee: {transaction.Payee}</div>
                <div>Amount: {formatPrice(transaction.Amount)}</div>
                <div>
                  <Categories
                    chosenCategoryLabel={transaction.Category}
                    open={false}
                    setOpen={() => {}}
                    categoryChosen={(newCategoryLabel: string) => {
                      transaction.Category = newCategoryLabel;
                      saveTransactions(context);
                    }}
                  ></Categories>
                </div>
              </TransactionLI>
            ))}
          </ul>
          <button onClick={loadNewTransactions}>Load new transactions.</button>
        </div>
      )}
    </>
  );
}
