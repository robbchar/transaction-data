import { createContext } from 'react';
import { ContextType } from './types/DataType.ts';

const DataContext = createContext<ContextType>({
  organizedData: new Map(),
  dataToView: [],
  originalData: [],
  monthYearDisabled: {}
});

export default DataContext;
