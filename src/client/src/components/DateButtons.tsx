import { useEffect, useState } from 'react';
import { transaction } from '../types/DataType';
import StyledButton from './Button';

var monthStrings = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface DateButtonsProps {
  organizedData: Map<number, Map<number, transaction[]>>;
  onDateChanged: (isDisabled: boolean, month: number, year: number) => void;
}

const DateButtons: React.FC<DateButtonsProps> = ({
  organizedData,
  onDateChanged,
}) => {
  const [buttons, setButtons] = useState<React.ReactElement[]>([]);

  const handleClick = (isDisabled: boolean, value: string): void => {
    const [month, year] = JSON.parse(value);

    onDateChanged(isDisabled, month, year);
  };

  useEffect(() => {
    const buttons: React.ReactElement[] = [];
    let index = 0;
    organizedData.forEach(
      (
        yearMap: Map<number, transaction[]>,
        year: number,
        map: Map<number, Map<number, transaction[]>>,
      ) => {
        yearMap.forEach(
          (
            transactions: transaction[],
            month: number,
            monthMap: Map<number, transaction[]>,
          ) => {
            buttons.push(
              <StyledButton
                onClick={handleClick}
                key={index++}
                value={JSON.stringify([month, year])}
                label={`${monthStrings[month]} ${year}`}
              />,
            );
          },
        );
      },
    );
    setButtons(buttons);
  }, [organizedData]);

  return buttons;
};
export default DateButtons;
