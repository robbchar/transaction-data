import fs from 'fs';
import express, { Request } from 'express';
import path from 'path';

import { getContentsOfFile, getOriginalTransactions } from './functions.ts';

const router = express.Router();

router.get('/get-original-transactions', (req, res) => {
  const directoryPath = path.join(
    import.meta.dirname,
    '/original-transactions-data',
  );
  const fileType = '.csv';

  res.send(getOriginalTransactions(directoryPath, fileType));
});

router.get('/get-saved-transactions', (req, res) => {
  const filePath = path.join(
    import.meta.dirname,
    '/saved-transactions-data/transactions.csv',
  );

  const transactions = getContentsOfFile(filePath);
  res.send(transactions);
});

interface CSVSaveParams {
  contents: string;
}

// curl -X PUT -H 'Content-Type: application/json' -d '{ "contents": "Posted Date,Reference Number,Payee,Address,Amount,Category" }' http://localhost:3000/api/save-transactions
router.put('/save-transactions', (req: Request<CSVSaveParams>, res) => {
  const contents = decodeURIComponent(req.body.contents);
  const filePath = path.join(
    import.meta.dirname,
    '/saved-transactions-data/transactions.csv',
  );
  fs.writeFileSync(filePath, contents, {
    encoding: 'utf8',
    mode: 0o666,
    flag: 'w',
  });
  res.send('Success!');
});

export default router;
