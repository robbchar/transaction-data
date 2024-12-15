import { fireEvent, render } from '@testing-library/react';

import ViewTransactions from './ViewTransactions';
import DataContext from '../DataContext.tsx';
import { GroupByEnum, transaction } from '../types/DataType.ts';

const renderPage = () => {
  const date = new Date('2024-05-31T08:00:00.000Z');
  const monthMap = new Map<number, transaction[]>();
  monthMap.set(1, [
    {
      date: date,
      id: "1",
      description: 'Joe Blow',
      amount: 100,
      category: 'gum',
    },
  ]);
  const yearMap = new Map<number, Map<number, transaction[]>>();
  yearMap.set(date.getFullYear(), monthMap)
  return {
    ...render(
      <DataContext.Provider
        value={{
          originalData: [
            {
              date: date,
              id: "1",
              description: 'Joe Blow',
              amount: 100,
              category: 'gum',
            },
          ],
          organizedData: yearMap,
          dataToView: [
            {
              date: date,
              id: "1",
              description: 'Joe Blow',
              amount: 100,
              category: 'gum',
            },
          ],
          monthYearDisabled: { ["1"]: false }
        }}
      >
        <ViewTransactions />
      </DataContext.Provider>,
    )
  };
};

describe("ViewTransactions page", () => {
  it('Renders', () => {
    renderPage();
  });

  // this test doesn't actually work, I think the framework doesnt check the radio button correctly
  it('The GroupBy button works', () => {
    const { getByLabelText, debug } = renderPage();

    const typeRadio = getByLabelText('Expenses vs Deposits')
    fireEvent.click(typeRadio, { target: { value: GroupByEnum.Type } });
    expect((typeRadio as HTMLInputElement).checked).toBe(true)
    // debug();
    const categoryRadio = getByLabelText('Categories')
    fireEvent.click(categoryRadio, { target: { value: GroupByEnum.Category } });
    expect((categoryRadio as HTMLInputElement).checked).toBe(true)
    // debug();
  });
});