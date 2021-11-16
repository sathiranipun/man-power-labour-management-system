import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection } from 'firebase/firestore';
import { globalActionTypes } from './Reducers/globalReducer';
import { userActionTypes } from './Reducers/userReducer';

let userDocSubscriber;

export const login = async (email, password) => {
    const auth = getAuth();
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        let user = (({ uid, email }) => ({ uid, email }))(credentials.user);
        const userDoc = await collection('users').doc(user.uid).get();
        if (!userDoc.exists) {

        }
    } catch (error) {

    }
}

export const logout = async () => {
    try {
        await signOut();
    } catch (error) {
        console.log(error);
    }
}

export const authStateChangeHandle = (globalDispatch, userDispatch) => {
    onAuthStateChanged({
        next: async (loggedUser) => {
            if (loggedUser) {
                const userID = loggedUser.uid;
                if (!userDocSubscriber) {
                    userDocSubscriber = collection('users').doc(userID).onSnapshot({
                        next: async (user) => {
                            userDispatch({
                                type: userActionTypes.SET_LOGGED_USER,
                                loggedUserData: user,
                            });
                            globalDispatch({
                                type: globalActionTypes.SET_LOGGEDIN,
                                loggedIn: true,
                            });
                            globalDispatch({
                                type: globalActionTypes.SET_GLOBAL_AUTH_LOADING,
                                authLoading: false,
                            });
                        },
                        error: (err) => console.log(err)
                    })
                }
            } else {
                userDispatch({
                    type: userActionTypes.SET_LOGGED_USER,
                    loggedUserData: null,
                });
                globalDispatch({
                    type: globalActionTypes.SET_LOGGEDIN,
                    loggedIn: false,
                });
                globalDispatch({
                    type: globalActionTypes.SET_GLOBAL_AUTH_LOADING,
                    authLoading: false,
                });
                userDocSubscriber = null
            }
        },
        error: (err) => console.log(err),
    })
};
