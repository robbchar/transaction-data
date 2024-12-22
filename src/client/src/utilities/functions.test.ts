import {
  formatDate,
  formatPrice,
  getDataToView,
  organizeTheData,
  returnMonthYearKey,
} from './functions';

const getOrganizedMap = () => {
  const organizedMap = new Map();
  organizedMap.set(2024, new Map());
  organizedMap.get(2024)?.set(9, [
    {
      account: 'BOA',
      amount: -12.99,
      category: 'Mystery Transaction',
      date: new Date('2024-10-12T07:00:00.000Z'),
      description: 'PP*APPLE.COM/BILL 402-935-7733 CA',
      id: '24036384285071487336300',
    },
    {
      account: 'BOA',
      amount: -6,
      category: 'Subscriptions',
      date: new Date('2024-10-11T07:00:00.000Z'),
      description: 'Peacock 2116A PremPlus 212-6640138 NY',
      id: '24204294285000794085075',
    },
  ]);
  organizedMap.get(2024)?.set(8, [
    {
      account: 'BOA',
      amount: -26.24,
      category: 'Groceries',
      date: new Date('2024-09-11T07:00:00.000Z'),
      description: 'FRED-MEYER #0218 WARRENTON OR',
      id: '24445004284300561877990',
    },
  ]);
  return organizedMap;
};

describe('test for the functions file', () => {
  it('returnMonthYearKey returns the correct key', () => {
    const key = returnMonthYearKey(9, 2024);
    expect(key).toEqual('9_2024');
  });

  it('organizeTheData organizes the data correctly', () => {
    const organizedData = organizeTheData([
      {
        date: new Date('2024-10-12T07:00:00.000Z'),
        description: 'PP*APPLE.COM/BILL 402-935-7733 CA',
        amount: -12.99,
        account: 'BOA',
        id: '24036384285071487336300',
        category: 'Mystery Transaction',
      },
      {
        date: new Date('2024-10-11T07:00:00.000Z'),
        description: 'Peacock 2116A PremPlus 212-6640138 NY',
        amount: -6.0,
        account: 'BOA',
        id: '24204294285000794085075',
        category: 'Subscriptions',
      },
      {
        date: new Date('2024-09-11T07:00:00.000Z'),
        description: 'FRED-MEYER #0218 WARRENTON OR',
        amount: -26.24,
        account: 'BOA',
        id: '24445004284300561877990',
        category: 'Groceries',
      },
    ]);
    expect(organizedData).toEqual(getOrganizedMap());
  });

  it('getDataToView gets the data to view', () => {
    const organizedMap = getOrganizedMap();
    const dataToView = getDataToView(organizedMap, { '9': false });
    expect(dataToView).toEqual([
      {
        account: 'BOA',
        amount: -12.99,
        category: 'Mystery Transaction',
        date: new Date('2024-10-12T07:00:00.000Z'),
        description: 'PP*APPLE.COM/BILL 402-935-7733 CA',
        id: '24036384285071487336300',
      },
      {
        account: 'BOA',
        amount: -6,
        category: 'Subscriptions',
        date: new Date('2024-10-11T07:00:00.000Z'),
        description: 'Peacock 2116A PremPlus 212-6640138 NY',
        id: '24204294285000794085075',
      },
      {
        account: 'BOA',
        amount: -26.24,
        category: 'Groceries',
        date: new Date('2024-09-11T07:00:00.000Z'),
        description: 'FRED-MEYER #0218 WARRENTON OR',
        id: '24445004284300561877990',
      },
    ]);
  });

  it('formatPrice formats correctly', () => {
    const formattedString = formatPrice(1123456789);
    expect(formattedString).toEqual('$1,123,456,789.00');
  });

  it('formatDate formats correctly', () => {
    const newDate: Date = new Date('2024-05-31T08:00:00.000Z');
    const formattedString = formatDate(newDate);
    expect(formattedString).toEqual('05/31/2024');
  });
});
