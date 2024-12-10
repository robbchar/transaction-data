import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Chart, ReactGoogleChartProps } from 'react-google-charts';
import DataContext from '../DataContext';
import { transaction } from '../types/DataType';
import DateButtons from '../components/DateButtons';
import { getDataToView, updateMonthYearDisabled } from '../functions';
import { getPieChartProps } from '../utilities/chartTypeData';


enum ChartTypes {
  Pie = 'PieChart',
  Line = 'LineChart',
}

function getPropsForChartType(
  chartType: string,
  dataToView: transaction[],
): ReactGoogleChartProps {
  // initialize a return variable
  let chartOptions: ReactGoogleChartProps = {
    chartType: ChartTypes.Pie,
  };
  switch (chartType) {
    case ChartTypes.Pie:
      chartOptions = getPieChartProps(dataToView);
      break;
  }

  return chartOptions;
}

export default function ViewTransactions() {
  const context = useContext(DataContext);
  const [chartOptions, setChartOptions] = useState<ReactGoogleChartProps>({
    chartType: 'PieChart',
  });
  const [dataToView, setDataToView] = useState<transaction[]>([]);


  useEffect(() => {
    setChartOptions(getPropsForChartType('PieChart', context.dataToView));
  }, [context.dataToView]);

  function chartSelected(event: ChangeEvent<HTMLSelectElement>): void {
    setChartOptions(
      getPropsForChartType(event.target.value, dataToView),
    );
  }

  const onDateChanged = (isDisabled: boolean, month: number, year: number) => {
    updateMonthYearDisabled(isDisabled, month, year, context);
    context.dataToView = getDataToView(context);
    setDataToView(context.dataToView);
  };

  return (
    <>
      <div>
        <span>Choose a chart type: </span>
        <select name="charts" onChange={chartSelected}>
          <option value={ChartTypes.Pie.toString()}>{ChartTypes.Pie}</option>
        </select>
      </div>
      <div>
        <span>Current Dates: </span>
        <DateButtons organizedData={context.organizedData} onDateChanged={onDateChanged} />
      </div>
      <Chart {...chartOptions} />
    </>
  );
}
