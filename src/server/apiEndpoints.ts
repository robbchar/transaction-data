import fs, { writeFileSync } from "fs";
import express, { Request, Response } from "express";
import path from "path";

import { getContentsOfFiles } from "./functions.ts";

const router = express.Router();

router.get("/get-original-transactions", (req, res) => {
  const directoryPath = path.join(
    import.meta.dirname,
    "/original-transactions-data"
  );
  const fileType = ".csv";

  res.send(getContentsOfFiles(directoryPath, fileType));
});

router.get("/get-saved-transactions", (req, res) => {
  const directoryPath = path.join(
    import.meta.dirname,
    "/saved-transactions-data"
  );
  const fileType = ".csv";

  res.send(getContentsOfFiles(directoryPath, fileType));
});

interface CSVSaveParams {
  contents: string;
}

// curl -X PUT -H 'Content-Type: application/json' -d '{ "contents": "Posted Date,Reference Number,Payee,Address,Amount,Category" }' http://localhost:3000/api/save-transactions
router.put("/save-transactions", (req: Request<CSVSaveParams>, res) => {
  const contents = req.body.contents;
  const filePath = path.join(
    import.meta.dirname,
    "/saved-transactions-data/transactions.txt"
  );

  fs.writeFileSync(filePath, contents, {
    encoding: "utf8",
    mode: 0o666,
    flag: "w",
  });
  res.send("Success!");
});

export default router;
