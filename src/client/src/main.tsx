import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import DataContext from "./DataContext.tsx";
import { DataType } from "./types/DataType.ts";
import "./index.css";
import Papa from "papaparse";

const data = await fetch("./api/get-saved-transactions")
  .then((response) => response.text())
  .then((responseText) => {
    // -- parse csv
    return Papa.parse<DataType>(responseText, {
      header: true,
      dynamicTyping: true,
    });
  });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataContext.Provider value={data as DataType}>
      <App />
    </DataContext.Provider>
  </StrictMode>
);
