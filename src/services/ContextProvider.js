import { createContext, useReducer } from "react";
import { laboursInitialState } from "./InitialState/LabourList";
import { loggedUser } from "./InitialState/LoggedUser";
import labourReducer from "./Reducers/LabourReducer";
import userReducer from "./Reducers/userReducer";

export const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [userState, userDispatch] = useReducer(userReducer, loggedUser);
    const [labourState, labourDispatch] = useReducer(labourReducer, laboursInitialState);

    return (
        <StateContext.Provider value={
            {
                userState,
                userDispatch,
                labourState,
                labourDispatch,
            }
        }>
            {children}
        </StateContext.Provider>
    )
}