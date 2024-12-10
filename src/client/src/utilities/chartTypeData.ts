import { ReactGoogleChartProps } from "react-google-charts";
import { transaction, TransactionCategories } from "../types/DataType";

export const getPieChartProps = (dataToView: transaction[]) => {
  const chartOptions: ReactGoogleChartProps = {
    chartType: 'PieChart',
  };
  const data: TransactionCategories = {};
  dataToView.forEach(transaction => {
    if (!transaction.category) return;
    const key = transaction.category;
    const amounnt = transaction.amount >= 0 ? transaction.amount : transaction.amount * -1;

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
  chartOptions.formatters = [
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

  return chartOptions;
};
