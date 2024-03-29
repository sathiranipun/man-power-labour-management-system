import { useEffect, useState } from "react";
import { useStateValue } from "./ContextProvider";
import { Navigate } from 'react-router-dom';

export const GuardedRoute = ({ Component, ...rest }) => {
    const { userState, globalState } = useStateValue();
    const [isLoggedIn, setIsLoggedIn] = useState(userState.loggedUserData !== null && globalState.loggedIn);

    useEffect(() => {
        setIsLoggedIn(userState.loggedUserData !== null && globalState.loggedIn);
    }, [userState.loggedUserData, globalState.loggedIn]);
    if (isLoggedIn) {
        return (
            <Component {...rest} />
        );
    }

    return (
        <Navigate to='/login' />
    );
}