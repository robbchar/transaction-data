import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App.tsx';
import DataContext from './DataContext.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import ViewTransactions from './pages/ViewTransactions.tsx';
import EditTransactions from './pages/EditTransActions.tsx';
import {
  getDataToView,
  getSavedTransactions,
  organizeTheData,
} from './transactionsApi.ts';
import { ContextType } from './types/DataType.ts';

const contextData: ContextType = {
  organizedData: {},
  dataToView: [],
  originalData: await getSavedTransactions(),
};
contextData.organizedData = organizeTheData(contextData.originalData);
contextData.dataToView = getDataToView(contextData.organizedData);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ViewTransactions />,
      },
      {
        path: 'pages/EditTransactions',
        element: <EditTransactions />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataContext.Provider value={contextData}>
      <RouterProvider router={router} />
    </DataContext.Provider>
  </StrictMode>,
);
