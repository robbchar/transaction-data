import fs from 'fs';
import express, { Request } from 'express';
import path from 'path';

import { getContentsOfFile, getOriginalTransactions } from './functions.ts';

const router = express.Router();

router.get('/get-original-transactions/:accountType', (req, res) => {
  const accountType = req.params.accountType;
  const directoryPath = path.join(
    import.meta.dirname,
    '/original-transactions-data',
  );
  const fileType = '.csv';

  res.json(getOriginalTransactions(directoryPath, fileType, accountType));
});

router.get('/get-saved-transactions', (req, res, next) => {
  const filePath = path.join(
    import.meta.dirname,
    '/saved-transactions-data/transactions.json',
  );
  try {
    const transactions = getContentsOfFile(filePath);
    res.send(transactions);
  } catch (err) {
    next(err) // Pass errors to Express.
  }
});

// curl -X PUT -H 'Content-Type: application/json' -d '{ "JSON stringified transactions" }' http://localhost:3000/api/save-transactions
router.put('/save-transactions', (req: Request<string>, res) => {
  const contents = req.body;
  const filePath = path.join(
    import.meta.dirname,
    '/saved-transactions-data/transactions.json',
  );

  fs.writeFileSync(filePath, JSON.stringify(contents, null, 2), {
    encoding: 'utf8',
    mode: 0o666,
    flag: 'w',
  });
  res.send('Success!');
});

export default router;
