export const globalActionTypes = {
    SET_LOGGEDIN: 'SET_LOGGEDIN',
    SET_GLOBAL_AUTH_LOADING: 'SET_GLOBAL_AUTH_LOADING',
    SET_GLOBAL_LOADING: 'SET_GLOBAL_LOADING',
};

const globalReducer = (state, action) => {
    switch (action.type) {
        case globalActionTypes.SET_LOGGEDIN:
            return {
                ...state,
                loggedIn: action.loggedIn,
            };

        case globalActionTypes.SET_GLOBAL_AUTH_LOADING:
            return {
                ...state,
                authLoading: action.authLoading
            };

        case globalActionTypes.SET_GLOBAL_LOADING:
            return {
                ...state,
                globalLoading: action.globalLoading
            }

        default:
            return state;
    }
};

export default globalReducer;