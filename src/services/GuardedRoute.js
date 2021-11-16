import { useEffect, useState } from "react";
import { useStateValue } from "./ContextProvider";
import { Navigate, Route } from 'react-router-dom';

export const GuardedRoute = ({ Component, ...rest }) => {
    const { userState, globalState } = useStateValue();
    const [isLoggedIn, setIsLoggedIn] = useState(userState.loggedUserData !== null && globalState.loggedIn);

    useEffect(() => {
        setIsLoggedIn(userState.loggedUserData !== null && globalState.loggedIn);
    }, [userState.loggedUserData, globalState.loggedIn]);
    console.log('running');
    if (isLoggedIn) {
        console.log(isLoggedIn);
        return (
            <Component {...rest} />
        );
    }

    return (
        <Navigate to='/login' />
    );
}