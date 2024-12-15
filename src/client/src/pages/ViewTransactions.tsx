import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Chart, ReactGoogleChartProps } from 'react-google-charts';
import { styled } from 'styled-components';
import DataContext from '../DataContext';
import { GroupByEnum, transaction } from '../types/DataType';
import DateButtons from '../components/DateButtons';
import { getDataToView, updateMonthYearDisabled } from '../functions';
import { getPieChartProps } from '../utilities/chartTypeData';

enum ChartTypes {
  Pie = 'PieChart',
}

function getPropsForChartType(
  chartType: string,
  dataToView: transaction[],
  groupdBy: GroupByEnum
): ReactGoogleChartProps {
  // initialize a return variable
  let chartOptions: ReactGoogleChartProps = {
    chartType: ChartTypes.Pie,
  };
  switch (chartType) {
    case ChartTypes.Pie:
      chartOptions = getPieChartProps(dataToView, groupdBy);
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
  const [groupedValue, setGroupedValue] = useState<GroupByEnum>(GroupByEnum.Type);

  useEffect(() => {
    setChartOptions(getPropsForChartType(chartOptions.chartType, context.dataToView, groupedValue));
  }, [context.dataToView]);

  function chartSelected(event: ChangeEvent<HTMLSelectElement>): void {
    setChartOptions(
      getPropsForChartType(event.target.value, context.dataToView, groupedValue),
    );
  }

  const onDateChanged = (isDisabled: boolean, month: number, year: number) => {
    updateMonthYearDisabled(isDisabled, month, year, context);
    context.dataToView = getDataToView(context);
    setDataToView(context.dataToView);
  };

  const onGroupingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupedValue(event.target.value as GroupByEnum);
    setChartOptions(getPropsForChartType(chartOptions.chartType, context.dataToView, event.target.value as GroupByEnum));
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
          <input type="radio" id="group-type" name="groupby" value={GroupByEnum.Type} onChange={onGroupingChange} checked={groupedValue === GroupByEnum.Type} />
          <label htmlFor="group-type">Expenses vs Deposits</label>
        </div>
        <div>
          <input type="radio" id="group-categories" name="groupby" value={GroupByEnum.Category} onChange={onGroupingChange} checked={groupedValue === GroupByEnum.Category} />
          <label htmlFor="group-categories">Categories</label>
        </div>
      </GroupByContainer>
      <Chart {...chartOptions} />
    </>
  );
}
