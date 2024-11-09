import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import DataContext from "./DataContext.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ViewTransactions from "./pages/ViewTransactions.tsx";
import EditTransactions from "./pages/EditTransActions.tsx";
import { getSavedTransactions } from "./transactionsApi.ts";

const data = await getSavedTransactions();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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
