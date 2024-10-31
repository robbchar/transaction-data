import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).send({
    error: { message: "Something went wrong", error: JSON.stringify(err) },
  });
};

export function getContentsOfFiles(directoryPath: string, fileType: string) {
  const filenames = fs.readdirSync(directoryPath);

  const matchingFiles = filenames.filter(
    (file) => path.extname(file) === fileType
  );

  return matchingFiles.reduce((result, file) => {
    const filePath = path.join(directoryPath, file);
    const fileContent = getContentsOfFile(filePath);
    return result + fileContent + "\n";
  }, "");
}

export function getContentsOfFile(filePath: string) {
  return fs.readFileSync(filePath, "utf-8");
}
