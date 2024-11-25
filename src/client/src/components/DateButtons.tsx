import { MouseEvent, useEffect, useState } from "react";
import { CSVData } from "../types/DataType";
import StyledButton from "./Button";

var monthStrings = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

interface DateButtonsProps {
  organizedData: Map<number, Map<number, CSVData[]>>
  onDateChanged: (isDisabled: boolean, month: number, year: number) => void
}

const DateButtons: React.FC<DateButtonsProps> = ({ organizedData, onDateChanged }) => {
  const [buttons, setButtons] = useState<React.ReactElement[]>([]);

  const handleClick = (isDisabled: boolean, value: string): void => {
    const [month, year] = JSON.parse(value);

    onDateChanged(isDisabled, month, year);
  };

  useEffect(() => {
    const buttons: React.ReactElement[] = [];
    let index = 0;
    organizedData.forEach((yearMap: Map<number, CSVData[]>, year: number, map: Map<number, Map<number, CSVData[]>>) => {
      yearMap.forEach((transactions: CSVData[], month: number, monthMap: Map<number, CSVData[]>) => {
        buttons.push(<StyledButton onClick={handleClick} key={index++} value={JSON.stringify([month, year])} label={`${monthStrings[month]} ${year}`} />)
      });
    });
    setButtons(buttons.reverse());
  }, [organizedData]);

  return buttons;
};
export default DateButtons;
