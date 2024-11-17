import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import DateSlider from './DateSlider.tsx';

it('Renders the DateSlider component', () => {
  render(
    <DateSlider
      startDate={new Date('1/1/2024')}
      endDate={new Date('12/31/2024')}
      dateChanged={() => console.log('DateC hanged')}
    />,
  );

  expect(true).toBeTruthy();
});
