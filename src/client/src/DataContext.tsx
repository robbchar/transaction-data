import { createContext } from "react";
import { DataType } from "./types/DataType.ts";

const DataContext = createContext<DataType | null>(null);

export default DataContext;
