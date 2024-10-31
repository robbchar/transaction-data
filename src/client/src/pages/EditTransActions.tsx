import { useContext, useState } from "react";
import Papa from "papaparse";

import DataContext from "../DataContext.tsx";
import { CSVData, getTransactionById } from "../types/DataType.ts";
import { saveTransactions } from "../transactionsApi.ts";

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

    setData(context);
    saveTransactions(context);
  };

  return (
    <>
      {!context ? (
        <span>content did not load</span>
      ) : (
        <div>
          <span>Total number of transactions: {data?.length ?? 0}</span>
          <button onClick={loadNewTransactions}>Load new transactions.</button>
        </div>
      )}
    </>
  );
}
