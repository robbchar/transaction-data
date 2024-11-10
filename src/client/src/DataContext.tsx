import { createContext } from "react";
import { ContextType } from "./types/DataType.ts";

const DataContext = createContext<ContextType>({ organizedData: {}, dataToView: [] });

export default DataContext;
