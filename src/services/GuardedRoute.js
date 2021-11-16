import { useEffect, useState } from "react";
import { useStateValue } from "./ContextProvider";
import { Navigate, Route } from 'react-router-dom';

export const GuardedRoute = ({ Component, ...rest }) => {
    const { userState, globalState } = useStateValue();
    // const [isLoggedIn, setIsLoggedIn] = useState(userState.loggedUserData !== null && globalState.loggedIn);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        // setIsLoggedIn(userState.loggedUserData !== null && globalState.loggedIn);
        setIsLoggedIn(true);
    }, [userState.loggedUserData, globalState.loggedIn]);

    if (isLoggedIn) {
        return (
            <Component />
        );
    }

    return (
        <Navigate to='/login' />
    );
}