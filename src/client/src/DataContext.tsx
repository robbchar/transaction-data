import { createContext } from "react";
import { CSVData } from "./types/DataType.ts";

const DataContext = createContext<CSVData[]>(new Array<CSVData>());

export default DataContext;
