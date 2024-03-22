import { createContext } from "react";
import { ContextInterface } from "../types/type";

const defaultContextValue: ContextInterface = {
    usersName: [],
    loading: true,
    error: false
}

export const DataContext = createContext<ContextInterface>(defaultContextValue)