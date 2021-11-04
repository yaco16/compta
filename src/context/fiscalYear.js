import React, { createContext, useState } from 'react';

export const FiscalYearContext=createContext()

const defaultValues = {
  year1: '',
  year2:''
}

export default function FiscalYearContextProvider({children}) {
  const [fiscalYear, setFiscalYear] = useState(defaultValues);
  const updateFiscalYear = function(data) {
    setFiscalYear(data)
  };
  return <FiscalYearContext.Provider value={{fiscalYear, setFiscalYear}}>{children}</FiscalYearContext.Provider>
};