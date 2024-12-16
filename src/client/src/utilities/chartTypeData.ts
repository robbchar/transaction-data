import { ReactGoogleChartProps } from "react-google-charts";
import { GroupByEnum, GroupByItemsAmounts, transaction, TransactionCategoriesAmounts } from "../types/DataType";

export const getPieChartProps = (dataToView: transaction[], groupBy: GroupByEnum) => {
  const chartOptions: ReactGoogleChartProps = {
    chartType: 'PieChart',
  };
  const categoryData: TransactionCategoriesAmounts = {};
  const groupsByData: GroupByItemsAmounts = {};
  dataToView.forEach(transaction => {
    if (!transaction.category) return;
    if (groupBy === GroupByEnum.Category) {
      const key = transaction.category;
      const amounnt = transaction.amount >= 0 ? transaction.amount : transaction.amount * -1;

      if (key in categoryData) {
        categoryData[key as keyof TransactionCategoriesAmounts] =
          (categoryData[key as keyof TransactionCategoriesAmounts] as number) +
          (amounnt < 0 ? amounnt * -1 : amounnt);
      } else {
        categoryData[key as keyof TransactionCategoriesAmounts] = amounnt;
      }
    } else if (groupBy === GroupByEnum.Type) {
      const key = transaction.description.startsWith('Deposit') ? 'Deposits' : 'Withdrawls';
      const amounnt = transaction.amount >= 0 ? transaction.amount : transaction.amount * -1;

      if (key in groupsByData) {
        groupsByData[key as keyof GroupByItemsAmounts] =
          (groupsByData[key as keyof GroupByItemsAmounts] as number) +
          (amounnt < 0 ? amounnt * -1 : amounnt);
      } else {
        groupsByData[key as keyof GroupByItemsAmounts] = amounnt;
      }
    }
  });
  chartOptions.data = groupBy === GroupByEnum.Category ?
    [['Category', 'Amount'], ...Object.entries(categoryData)] :
    [['Deposits', 'Withdrawls'], ...Object.entries(groupsByData)];
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
