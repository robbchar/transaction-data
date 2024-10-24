import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Papa from "papaparse";

import "./index.css";
import App from "./App.tsx";
import DataContext from "./DataContext.tsx";
import { CSVData } from "./types/DataType.ts";
import ErrorPage from "./pages/ErrorPage.tsx";
import ViewTransactions from "./pages/ViewTransactions.tsx";
import EditTransactions from "./pages/EditTransactions.tsx";

const data = await fetch("./api/get-saved-transactions")
  .then((response) => response.text())
  .then((responseText) => {
    // -- parse csv
    return Papa.parse<CSVData[]>(responseText, {
      header: true,
      dynamicTyping: true,
    });
  });

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "pages/ViewTransactions",
        element: <ViewTransactions />,
      },
      {
        path: "pages/EditTransactions",
        element: <EditTransactions />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataContext.Provider value={data}>
      <RouterProvider router={router} />
    </DataContext.Provider>
  </StrictMode>
);
