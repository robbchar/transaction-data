import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';

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

const getBOATransactions = (
  directoryPath: string,
  filenames: string[],
): object[] => {
  const transactions = filenames.map(filename => {
    const filePath = path.join(directoryPath, 'BOA', filename);
    const fileContents = getContentsOfFile(filePath);
    const linesOfFile = fileContents.split('\n');
    return linesOfFile.map(line => {
      const [column1, column2, column3, column4, column5] = line
        .trim()
        .split(',');
      //BOA: Posted Date,Reference Number,Payee,Address,Amount

      return {
        date: column1,
        description: column3.replace(/\"/g, '').trim(),
        amount: column5,
        account: 'BOA',
        id: column2,
      };
    });
  });

  return transactions.flat();
};

const getFibreTransactions = (
  directoryPath: string,
  filenames: string[],
): object[] => {
  const transactions = filenames.map(filename => {
    const filePath = path.join(directoryPath, 'fibre', filename);
    const fileContents = getContentsOfFile(filePath);
    const linesOfFile = fileContents.split('\n');
    return linesOfFile.map(line => {
      //"Transaction ID","Posting Date","Effective Date","Transaction Type","Amount","Check Number","Reference Number","Description","Transaction Category","Type","Balance","Memo","Extended Description"
      const [
        column1,
        column2,
        column3,
        column4,
        column5,
        column6,
        column7,
        column8,
      ] = line.split(',');
      // console.log(`column1: ${column1} colum2: ${column2} column3: ${column3} column4: ${column4} column5: ${column5} column6: ${column6} column7: ${column7} column8: ${column8} `);
      return {
        date: removeCharacterCaseInsensitive(column2, '"'),
        description: column8,
        amount: removeCharacterCaseInsensitive(column5, '"'),
        account: 'fibre',
        id: removeCharacterCaseInsensitive(column1, '"'),
      };
    });
  });

  return transactions.flat();
};

function removeCharacterCaseInsensitive(str: string, char: string) {
  const regex = new RegExp(char, 'gi');
  return str.replace(regex, '');
}

export function getOriginalTransactions(
  directoryPath: string,
  fileType: string,
  accountType: string,
): object[] {
  const directory = path.join(directoryPath, accountType);

  const filenames = fs
    .readdirSync(directory)
    .filter(file => path.extname(file) === fileType);
  let transactionFunction;
  if (accountType === 'BOA') {
    transactionFunction = getBOATransactions;
  } else if (accountType === 'fibre') {
    transactionFunction = getFibreTransactions;
  }

  return transactionFunction
    ? transactionFunction(directoryPath, filenames)
    : [];
}

// strips out empty lines...
export function getContentsOfFile(filePath: string) {
  try {
    const contents = fs.readFileSync(filePath, 'utf-8');
    const lines: string[] = contents
      .split('\n')
      .filter(line => line.trim() !== ''); // remove empty lines;

    if (filePath.endsWith('.csv') === true) {
      lines.splice(0, 1); // remove first line, first line is the CSV header
    }

    return lines.join('\n'); // join the lines back together
  } catch (err) {
    // Handle the error
    throw err;
  }
}
