import { createContext, useEffect, useState } from "react";
import { CardCollection } from "../types/data";
import { fetchCardData } from "../services/DataService";

type DataContextType = {
  data: CardCollection;
  loadData: () => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<CardCollection>([])

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    const result = await fetchCardData();
    if(result.status === 200 && result.response === 'ok') {
      setData(result.data);
    }
  }


  return (
    <DataContext.Provider value={{data, loadData}}>
      {children}
    </DataContext.Provider>
  )
}
