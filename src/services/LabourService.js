import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, updateDoc } from "@firebase/firestore"
import { labourActionTypes } from "./Reducers/LabourReducer";

export const getAllLabours = async (labourDispatch) => {
    try {
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
                    labourDispatch({
                        type: labourActionTypes.SET_LABOUR_LIST,
                        labourList: labourList,
                    });
                },
                error: (error) => {
                    console.log(error);
                }
            }
        )
    } catch (error) {
        console.log(error);
    }
}

export const addLabour = async (labourData) => {
    try {
        const db = getFirestore()
        const docRef = await addDoc(collection(db, 'labours'), labourData);
    } catch (error) {
        console.log(error);
    }
}

export const deleteLabour = async (labourUID) => {
    try {
        const db = getFirestore();
        await deleteDoc(doc(db, 'labours', labourUID));
    } catch (error) {
        console.log(error);
    }
}

export const updateLabour = async (labourData) => {
    try {
        const db = getFirestore();
        await updateDoc(doc(db, 'labours', labourData.uid), labourData);
    } catch (error) {
        console.log(error);
    }
}