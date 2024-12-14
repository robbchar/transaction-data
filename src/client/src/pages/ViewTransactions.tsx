import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Chart, ReactGoogleChartProps } from 'react-google-charts';
import { styled } from 'styled-components';
import DataContext from '../DataContext';
import { transaction } from '../types/DataType';
import DateButtons from '../components/DateButtons';
import { getDataToView, updateMonthYearDisabled } from '../functions';
import { getPieChartProps } from '../utilities/chartTypeData';

enum ChartTypes {
  Pie = 'PieChart',
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

const GroupByContainer = styled.div`
  display: flex;
  div {
    margin-left: .5rem;
    input {
      margin-right: .25rem;
    }
  }
`;


export default function ViewTransactions() {
  const context = useContext(DataContext);
  const [chartOptions, setChartOptions] = useState<ReactGoogleChartProps>({
    chartType: 'PieChart',
  });
  const [dataToView, setDataToView] = useState<transaction[]>([]);
  const [groupedValue, setGroupedValue] = useState<string>('type');

  useEffect(() => {
    setChartOptions(getPropsForChartType(chartOptions.chartType, context.dataToView));
  }, [context.dataToView]);

  function chartSelected(event: ChangeEvent<HTMLSelectElement>): void {
    setChartOptions(
      getPropsForChartType(event.target.value, context.dataToView),
    );
  }

  const onDateChanged = (isDisabled: boolean, month: number, year: number) => {
    updateMonthYearDisabled(isDisabled, month, year, context);
    context.dataToView = getDataToView(context);
    setDataToView(context.dataToView);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupedValue(event.target.value);
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
      <GroupByContainer>
        <span>Group By: </span>
        <div>
          <input type="radio" id="group-type" name="groups" value="type" onChange={onChange} checked={groupedValue === 'type'} />
          <label htmlFor="group-type">Expenses vs Deposits</label>
        </div>
        <div>
          <input type="radio" id="group-categories" name="groups" value="categories" onChange={onChange} checked={groupedValue === 'categories'} />
          <label htmlFor="group-categories">Categories</label>
        </div>
      </GroupByContainer>
      <Chart {...chartOptions} />
    </>
  );
}
