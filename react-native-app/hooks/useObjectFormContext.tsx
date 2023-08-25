import {createContext, Dispatch, SetStateAction, useContext} from "react";

export interface ObjectFormContextValues {
    value: [
        Record<string, string>,
        Dispatch<SetStateAction<Record<string, string>>>
    ]
}

export const ObjectFormContext = createContext<ObjectFormContextValues | undefined>(undefined)
export const useObjectFormContext = () => {
    const context = useContext(ObjectFormContext);
    if (context === undefined) {
        throw new Error('useObjectFormContext must be used within a ObjectFormContextProvider');
    }
    return context;
}