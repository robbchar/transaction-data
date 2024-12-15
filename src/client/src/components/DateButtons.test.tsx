import { fireEvent, render } from '@testing-library/react';

import { transaction } from "../types/DataType";
import DateButtons from "./DateButtons";
import { ECDH } from 'crypto';

const renderButtons = (dateChangedFunction = () => null) => {
  const mayDate = new Date('2024-05-31T08:00:00.000Z');
  const monthMap = new Map<number, transaction[]>();
  monthMap.set(mayDate.getMonth(), [
    {
      date: mayDate,
      id: "1",
      description: 'I bought a thing',
      amount: 100,
      category: 'things',
    },
  ]);
  const yearMap = new Map<number, Map<number, transaction[]>>();
  yearMap.set(mayDate.getFullYear(), monthMap);
  return {
    ...render(
      <DateButtons organizedData={yearMap} onDateChanged={dateChangedFunction} />
    )
  }
};

describe("DateButtons component", () => {
  it('clicking a button works', () => {
    const { getByText, container } = renderButtons();
    const button = getByText('May 2024');
    fireEvent.click(button);
    expect(container.querySelector('[data-isdisabled=true]')).toBeTruthy();
  });
});
