import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection } from 'firebase/firestore';

let userDocSubscriber;

const login = async (email, password) => {
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

export const authStateChangeHandle = () => {
    onAuthStateChanged({
        next: async (loggedUser) => {
            if (loggedUser) {
                const userID = loggedUser.uid;
                if (!userDocSubscriber) {
                    userDocSubscriber = collection('users').doc(userId).onSnapshot({
                        next: async (user) => {
                            // set logged user to context api
                        },
                        error: (err) => console.log(err)
                    })
                }
            } else {
                // set null for the user in context api
                userDocSubscriber = null
            }
        },
        error: (err) => console.log(err) 
    })
}
