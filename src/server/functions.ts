import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  res.status(500).send({
    error: { message: 'Something went wrong', error: JSON.stringify(err) },
  });
};

// could be optimized for perf
export function getOriginalTransactions(directoryPath: string, fileType: string): object[] {
  const transactions: object[] = [];
  const directories = fs.readdirSync(directoryPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  directories.forEach(directoryName => {
    const filenames = fs.readdirSync(path.join(directoryPath, directoryName))
      .filter(file => path.extname(file) === fileType);

    filenames.forEach(filename => {
      const filePath = path.join(directoryPath, directoryName, filename);
      const fileContents = getContentsOfFile(filePath);
      const linesOfFile = fileContents.split('\n');

      transactions.push(linesOfFile.map(line => {
        const [column1, column2, column3, column4, column5] = line.trim().split(',');
        //BOA: Posted Date,Reference Number,Payee,Address,Amount
        //fibre: 10/01,Withdrawal ACH Ameriprise Finc,-57.53,7686.81
        return directoryName === 'BOA' ? { date: column1, description: column3.replace(/\"/g, "").trim(), amount: column5, account: directoryName }
          : { date: column1, description: column2, amount: column3, balance: column4, account: directoryName };
      }));
    });
  });

  return transactions;
}

export function getContentsOfFile(filePath: string) {
  try {
    const contents = fs.readFileSync(filePath, 'utf-8');
    return contents;
  } catch (err) {
    // Handle the error
    throw err;
  }
}
