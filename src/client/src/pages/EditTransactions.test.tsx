import { render } from '@testing-library/react';

import EditTransactions from './EditTransActions';
import DataContext from '../DataContext.tsx';
import { transaction } from '../types/DataType.ts';

it('Renders the EditTransactions page', () => {
  const monthMap = new Map<number, transaction[]>();
  monthMap.set(1, [
    {
      date: new Date('1/1/2024'),
      id: "1",
      description: 'Joe Blow',
      amount: 100,
      category: 'gum',
    },
  ]);
  const yearMap = new Map<number, Map<number, transaction[]>>();
  yearMap.set(2004, monthMap)
  render(
    <DataContext.Provider
      value={{
        originalData: [
          {
            date: new Date('1/1/2024'),
            id: "1",
            description: 'Joe Blow',
            amount: 100,
            category: 'gum',
          },
        ],
        organizedData: yearMap,
        dataToView: [
          {
            date: new Date('1/1/2024'),
            id: "1",
            description: 'Joe Blow',
            amount: 100,
            category: 'gum',
          },
        ],
        monthYearDisabled: { ["1"]: false }
      }}
    >
      <EditTransactions />
    </DataContext.Provider>,
  );

  expect(true).toBeTruthy();
});
