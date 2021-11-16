import { collection, getFirestore, onSnapshot } from "@firebase/firestore"

export const getAllLabours = async () => {
    const db = getFirestore();
    let labourList = [];
    onSnapshot(
        collection(db, "labours"),
        {
            next: (snapshot) => {
                labourList = snapshot.docs;
                labourList = labourList.map(doc => {
                    return { id: doc.id, ...doc.data() }
                });
            },
            error: (error) => {
                console.log(error);
            }
        }
    )
}