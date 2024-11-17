import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Chart, ReactGoogleChartProps } from 'react-google-charts';
import DataContext from '../DataContext';
import { CSVData, TransactionCategories } from '../types/DataType';
import DateSlider from '../components/DateSlider';

enum ChartTypes {
  Pie = 'PieChart',
}

function getPropsForChartType(
  chartType: string,
  dataToView: CSVData[],
): ReactGoogleChartProps {
  const chartOptions: ReactGoogleChartProps = {
    chartType: 'PieChart',
  };
  switch (chartType) {
    case ChartTypes.Pie:
      chartOptions.chartType = 'PieChart';
      const data: TransactionCategories = {};
      dataToView.forEach(csvData => {
        const key = csvData.Category;
        const amounnt =
          csvData.Amount >= 0 ? csvData.Amount : csvData.Amount * -1;

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

  useEffect(() => {
    setChartOptions(getPropsForChartType('PieChart', context.dataToView));
  }, []);

  function chartSelected(event: ChangeEvent<HTMLSelectElement>): void {
    setChartOptions(
      getPropsForChartType(event.target.value, context.dataToView),
    );
  }

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
        <DateSlider
          startDate={new Date('1/1/2024')}
          endDate={new Date('12/31/2024')}
          dateChanged={() => console.log('DateC hanged')}
        ></DateSlider>
      </div>
      <Chart {...chartOptions} />
    </>
  );
}
