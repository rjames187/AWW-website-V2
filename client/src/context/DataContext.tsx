import { createContext, useEffect, useState } from "react";
import { ContentObject } from "../components/cms/types";
import { fetchData } from "../services/dataService";

export type DataContextData = Record<string, ContentObject[]>;

export interface DataContextValue {
  data: DataContextData | null;
  setData: (data: DataContextData | null) => void;
  setNeedRefresh: (needRefresh: boolean) => void;
}

export const DataContext = createContext<DataContextValue>({
  data: null,
  setData: () => {},
  setNeedRefresh: () => {}
});

function DataContextProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DataContextData | null>(null);
  const [needRefresh, setNeedRefresh] = useState(true);

  useEffect(() => {
    if (!needRefresh) {
      return;
    }

    (async () => {
      const response = await fetchData('data');
      if (!response.success) {
        console.error('Failed to fetch data:', response.message);
        return;
      }
      setData(response.data);
      setNeedRefresh(false);
    })();
  }, [needRefresh]);

  const contextValue = {
    data: data,
    setData: setData,
    setNeedRefresh: setNeedRefresh,
  }

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;