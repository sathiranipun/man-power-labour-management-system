export const userActionTypes = {
    SET_LOGGED_USER: 'SET_LOGGED_USER',
}

const userReducer = (state, action) => {
    switch (action.type) {
        case userActionTypes.SET_LOGGED_USER:
            return {
                ...state,
                loggedUserData: action.loggedUserData
            }
        default:
            return state;
    }
}

export default userReducer;