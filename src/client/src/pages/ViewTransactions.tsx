import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Chart, ReactGoogleChartProps } from 'react-google-charts';
import DataContext from '../DataContext';
import { transaction, TransactionCategories } from '../types/DataType';
import DateButtons from '../components/DateButtons';
import { getDataToView, updateMonthYearDisabled } from '../functions';

enum ChartTypes {
  Pie = 'PieChart',
}

function getPropsForChartType(
  chartType: string,
  dataToView: transaction[],
): ReactGoogleChartProps {
  const chartOptions: ReactGoogleChartProps = {
    chartType: 'PieChart',
  };
  switch (chartType) {
    case ChartTypes.Pie:
      chartOptions.chartType = 'PieChart';
      const data: TransactionCategories = {};
      dataToView.forEach(transaction => {
        if (!transaction.category) return;
        const key = transaction.category;
        const amounnt =
          transaction.amount >= 0 ? transaction.amount : transaction.amount * -1;

        if (key in data) {
          data[key as keyof TransactionCategories] =
            (data[key as keyof TransactionCategories] as number) +
            (amounnt < 0 ? amounnt * -1 : amounnt);
        } else {
          data[key as keyof TransactionCategories] = amounnt;
        }
      });
      chartOptions.data = [['Category', 'Amount'], ...Object.entries(data)];
      chartOptions.width = '100%';
      chartOptions.height = '400px';
      chartOptions.legendToggle;
      const formatters = [
        {
          type: 'NumberFormat' as const,
          column: 1,
          options: {
            prefix: '$',
            negativeColor: 'red',
            negativeParens: true,
          },
        },
      ];
      chartOptions.formatters = formatters;

      return chartOptions;
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
