import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, doc, getFirestore, getDoc, onSnapshot, setDoc, addDoc, deleteDoc, getDocs, updateDoc } from 'firebase/firestore';
import { globalActionTypes } from './Reducers/globalReducer';
import { userActionTypes } from './Reducers/userReducer';


let userDocSubscriber;

export const login = async (email, password) => {
    const auth = getAuth();
    const db = getFirestore();
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        let user = (({ uid, email }) => ({ uid, email }))(credentials.user);
        console.log(user);
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        console.log('hello');
        if (!userDoc.exists) {

        }
    } catch (error) {
        console.log(error);
    }
}

export const logout = async () => {
    const auth = getAuth();
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
}

export const authStateChangeHandle = async (globalDispatch, userDispatch) => {
    const auth = getAuth();
    const db = getFirestore();
    auth.onAuthStateChanged({
        next: async (loggedUser) => {
            globalDispatch({
                type: globalActionTypes.SET_GLOBAL_AUTH_LOADING,
                authLoading: true,
            });
            if (loggedUser) {
                const userID = loggedUser.uid;
                if (!userDocSubscriber) {

                    userDocSubscriber = onSnapshot(doc(db, 'users', userID), {
                        next: async (userRef) => {
                            const userData = userRef.data();
                            const user = (({ uid, email, name }) => ({ uid, email, name }))(userData);
                            console.log(user);
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

export const createUser = async (user) => {
    const db = getFirestore();
    const userCollectionRef = collection(db,'users')
    try {
        // admin should create an autheticated user....

        await addDoc(userCollectionRef,{
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email, 
        })
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async () => {
    const db = getFirestore();
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        let users = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        });
        return users;
    } catch (error) {
        console.log(error);
    }
}

export const onUpdateUser = async (user) => {
    const db = getFirestore();
    const docRef = doc(db,"users",user.uid)
    try {
        await updateDoc(docRef,{
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (uid) => {
    const db = getFirestore();
    try {
        await deleteDoc(doc(db,"users",uid))
    } catch (error) {
        console.log(error);
    }
}
