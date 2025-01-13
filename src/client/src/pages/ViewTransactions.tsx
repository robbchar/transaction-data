import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Chart, ReactGoogleChartProps } from 'react-google-charts';
import { styled } from 'styled-components';
import DataContext from '../DataContext';
import {
  GroupByEnum,
  GroupByItemsTransactions,
  transaction,
  TransactionCategoriesTransactions,
} from '../types/DataType';
import DateButtons from '../components/DateButtons';
import {
  formatDate,
  formatPrice,
  getDataToView,
  returnMonthYearKey,
} from '../utilities/functions';
import { getPieChartProps } from '../utilities/chartTypeData';

enum ChartTypes {
  Pie = 'PieChart',
}

function getPropsForChartType(
  chartType: string,
  dataToView: transaction[],
  groupdBy: GroupByEnum,
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
    margin-left: 0.5rem;
    input {
      margin-right: 0.25rem;
    }
  }
`;

const TransactionUl = styled.ul`
  padding: 0;
  margin-bottom: 1rem;
`;
const TransactionLI = styled.li`
  list-style: none;
  display: flex;
  gap: 1rem;
  padding-bottom: 0.1rem;
  > div {
    margin-right: 0.5ren;
    &:nth-child(2) {
      flex: 1;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;

export default function ViewTransactions() {
  const context = useContext(DataContext);
  const [chartOptions, setChartOptions] = useState<ReactGoogleChartProps>({
    chartType: 'PieChart',
  });
  const [dataToView, setDataToView] = useState<transaction[]>([]);
  const [groupedValue, setGroupedValue] = useState<GroupByEnum>(
    GroupByEnum.Type,
  );
  const [groupedTransactions, setGroupedTransactions] = useState<
    TransactionCategoriesTransactions | GroupByItemsTransactions
  >();

  useEffect(() => {
    setChartOptions(
      getPropsForChartType(
        chartOptions.chartType,
        context.dataToView,
        groupedValue,
      ),
    );
    groupTransactions();
  }, [context.dataToView]);

  useEffect(() => {
    groupTransactions();
  }, [groupedValue]);

  function chartSelected(event: ChangeEvent<HTMLSelectElement>): void {
    setChartOptions(
      getPropsForChartType(
        event.target.value,
        context.dataToView,
        groupedValue,
      ),
    );
  }
  //context.monthYearDisabled[key] = isDisabled;
  const onDateChanged = (isDisabled: boolean, month: number, year: number) => {
    context.monthYearDisabled[returnMonthYearKey(month, year)] = isDisabled;
    context.dataToView = getDataToView(
      context.organizedData,
      context.monthYearDisabled,
    );

    setDataToView(context.dataToView);
  };

  const onGroupingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupedValue(event.target.value as GroupByEnum);
    setChartOptions(
      getPropsForChartType(
        chartOptions.chartType,
        context.dataToView,
        event.target.value as GroupByEnum,
      ),
    );
  };

  const groupTransactions = () => {
    const categoryData: TransactionCategoriesTransactions = {};
    const groupsByData: GroupByItemsTransactions = {};
    context.dataToView.forEach(transaction => {
      if (groupedValue === GroupByEnum.Category && !transaction.category)
        return;

      if (groupedValue === GroupByEnum.Category) {
        if (!transaction.category) return;
        const key = transaction.category;

        if (!(key in categoryData))
          categoryData[key as keyof TransactionCategoriesTransactions] = [];

        categoryData[key as keyof TransactionCategoriesTransactions]?.push(
          transaction,
        );
      } else if (groupedValue === GroupByEnum.Type) {
        const key = transaction.description.startsWith('Deposit')
          ? 'Deposits'
          : 'Withdrawls';

        if (!(key in groupsByData))
          groupsByData[key as keyof GroupByItemsTransactions] = [];

        groupsByData[key as keyof GroupByItemsTransactions]?.push(transaction);
      }
    });

    if (groupedValue === GroupByEnum.Category) {
      setGroupedTransactions(categoryData);
    } else if (groupedValue === GroupByEnum.Type) {
      setGroupedTransactions(groupsByData);
    }
  };

  function getKeys<T extends object>(obj?: T): (keyof T)[] {
    if (!obj) return [];

    return Object.keys(obj) as (keyof T)[];
  }

  const getGroupsTransactionsMarkup = (
    groups?: TransactionCategoriesTransactions | GroupByItemsTransactions,
  ) => {
    if (!groups) return null;
    return getKeys(groups).map((groupTitle, groupIndex) => {
      const transactions =
        groups[
          groupTitle 
        ];
      if (!transactions) return;

      return (
        <>
          <h3>{groupTitle}:</h3>
          <TransactionUl key={groupIndex}>
            {transactions.map((transaction, index) => (
              <TransactionLI key={transaction.id}>
                <div>{`${formatDate(transaction.date)}`}</div>
                {/* <div>Account: {transaction.account}</div> */}
                <div>Payee: {transaction.description}</div>
                <div>Amount: {formatPrice(transaction.amount)}</div>
              </TransactionLI>
            ))}
          </TransactionUl>
        </>
      );
    });
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
        <DateButtons
          organizedData={context.organizedData}
          onDateChanged={onDateChanged}
        />
      </div>
      <GroupByContainer>
        <span>Group By: </span>
        <div>
          <input
            type="radio"
            id="group-type"
            name="groupby"
            value={GroupByEnum.Type}
            onChange={onGroupingChange}
            checked={groupedValue === GroupByEnum.Type}
          />
          <label htmlFor="group-type">Expenses vs Deposits</label>
        </div>
        <div>
          <input
            type="radio"
            id="group-categories"
            name="groupby"
            value={GroupByEnum.Category}
            onChange={onGroupingChange}
            checked={groupedValue === GroupByEnum.Category}
          />
          <label htmlFor="group-categories">Categories</label>
        </div>
      </GroupByContainer>
      <Chart {...chartOptions} />
      <div>{getGroupsTransactionsMarkup(groupedTransactions)}</div>
    </>
  );
}
