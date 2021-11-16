import { createContext, useContext, useReducer } from "react";
import { globalInitialState } from "./InitialState/globleInitialState";
import { laboursInitialState } from "./InitialState/LabourList";
import { loggedUser } from "./InitialState/LoggedUser";
import globalReducer from "./Reducers/globalReducer";
import labourReducer from "./Reducers/LabourReducer";
import userReducer from "./Reducers/userReducer";

export const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [userState, userDispatch] = useReducer(userReducer, loggedUser);
    const [globalState, globalDispatch] = useReducer(globalReducer, globalInitialState);
    const [labourState, labourDispatch] = useReducer(labourReducer, laboursInitialState);

    return (
        <StateContext.Provider value={
            {
                userState,
                userDispatch,
                globalState,
                globalDispatch,
                labourState,
                labourDispatch,
            }
        }>
            {children}
        </StateContext.Provider>
    )
};

export const useStateValue = () => useContext(StateContext);