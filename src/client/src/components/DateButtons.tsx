import { useEffect, useState } from "react";
import { CSVData } from "../types/DataType";

var months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

interface DateButtonsProps {
  organizedData: Map<number, Map<number, CSVData[]>>
}

const DateButtons: React.FC<DateButtonsProps> = ({ organizedData }) => {
  const [buttons, setButtons] = useState<React.ReactElement[]>([]);
  useEffect(() => {
    const buttons: React.ReactElement[] = [];
    organizedData.forEach((yearMap: Map<number, CSVData[]>, year: number, map: Map<number, Map<number, CSVData[]>>) => {
      yearMap.forEach((transactions: CSVData[], month: number, monthMap: Map<number, CSVData[]>) => {
        buttons.push(<button>{months[month]} {year}</button>)
      });
    });
    setButtons(buttons.reverse());
  }, [organizedData]);

  return buttons;
};
export default DateButtons;