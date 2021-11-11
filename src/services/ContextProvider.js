import { createContext, useReducer } from "react";
import { laboursInitialState } from "./InitialState/LabourList";
import labourReducer from "./Reducers/LabourReducer";

export const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [labourState, labourDispatch] = useReducer(labourReducer, laboursInitialState);

    return (
        <StateContext.Provider value={
            {
                labourState,
                labourDispatch,
            }
        }>
            {children}
        </StateContext.Provider>
    )
}