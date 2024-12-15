import '@testing-library/jest-dom';
import { getPieChartProps } from './chartTypeData';
import { GroupByEnum, transaction } from '../types/DataType';

describe("chartTypeData", () => {
  it('Calling getPieChartProps returns the right shape of data', () => {
    const input: transaction[] = [{
      date: new Date("2024-10-16T07:00:00.000Z"),
      description: "Withdrawal ACH Liberty Mutual",
      amount: 219.50,
      account: "fibre",
      id: "1",
      category: "Insurance"
    }]
    const chartOptions = getPieChartProps(input, GroupByEnum.Category);
    expect(chartOptions).toEqual({
      "chartType": "PieChart",
      "data": [
        [
          "Category",
          "Amount",
        ],
        [
          "Insurance",
          219.5,
        ],
      ],
      "formatters": [
        {
          "column": 1,
          "options": {
            "negativeColor": "red",
            "negativeParens": true,
            "prefix": "$",
          },
          "type": "NumberFormat",
        },
      ],
      "height": "400px",
      "width": "100%",
    });
  });

  it('Getting chart options groups by Type works', () => {
    const input: transaction[] = [{
      date: new Date("2024-10-28T07:00:00.000Z"),
      description: "Withdrawal SAFEWAY #2627 ASTORIA OR",
      amount: -219.50,
      account: "fibre",
      id: "1",
      category: "Groceries"
    }, {
      date: new Date("2024-10-31T08:00:00.000Z"),
      description: "Deposit Dividend Split Rate",
      amount: 555.50,
      account: "fibre",
      id: "2",
      category: "Income"
    }];
    const chartOptions = getPieChartProps(input, GroupByEnum.Type);
    expect(chartOptions).toEqual({
      "chartType": "PieChart",
      "data": [
        [
          "Deposits",
          "Withdrawls",
        ],
        [
          "Withdrawls",
          219.5,
        ],
        [
          "Deposits",
          555.5,
        ],
      ],
      "formatters": [
        {
          "column": 1,
          "options": {
            "negativeColor": "red",
            "negativeParens": true,
            "prefix": "$",
          },
          "type": "NumberFormat",
        },
      ],
      "height": "400px",
      "width": "100%",
    });
  });

  it('Getting chart options groups by Category works', () => {
    const input: transaction[] = [{
      date: new Date("2024-10-28T07:00:00.000Z"),
      description: "Withdrawal SAFEWAY #2627 ASTORIA OR",
      amount: -219.50,
      account: "fibre",
      id: "1",
      category: "Groceries"
    }, {
      date: new Date("2024-10-31T08:00:00.000Z"),
      description: "Deposit Dividend Split Rate",
      amount: 555.50,
      account: "fibre",
      id: "2",
      category: "Income"
    }];
    const chartOptions = getPieChartProps(input, GroupByEnum.Category);
    expect(chartOptions).toEqual({
      "chartType": "PieChart",
      "data": [
        [
          "Category",
          "Amount",
        ],
        [
          "Groceries",
          219.5,
        ],
        [
          "Income",
          555.5,
        ],
      ],
      "formatters": [
        {
          "column": 1,
          "options": {
            "negativeColor": "red",
            "negativeParens": true,
            "prefix": "$",
          },
          "type": "NumberFormat",
        },
      ],
      "height": "400px",
      "width": "100%",
    });
  });
});