import '@testing-library/jest-dom';
import { getPieChartProps } from './chartTypeData';
import { transaction } from '../types/DataType';

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
    const chartOptions = getPieChartProps(input);
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
});