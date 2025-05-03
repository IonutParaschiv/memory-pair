import { useContext } from "react";
import { DataContext } from "../providers/DataProvider";

export const useApi = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useApi must be used within a DataProvider");
  }
  return context;
}