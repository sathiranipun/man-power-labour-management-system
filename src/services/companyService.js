import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, updateDoc } from "@firebase/firestore"
import { companyActionTypes } from "./Reducers/companyReducer";

export const getAllCompanies = async (companyDispatch) => {
    try {
        const db = getFirestore();
        let companyList = [];
        onSnapshot(
            collection(db, 'companies'),
            {
                next: (snapshot) => {
                    let companySnapshots = snapshot.docs;
                    companyList = companySnapshots.map(doc => {
                        return { id: doc.id, ...doc.data() }
                    });
                    companyDispatch({
                        type: companyActionTypes.SET_COMPANY_LIST,
                        companyList: companyList,
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
};

export const addCompany = async (companyData) => {
    try {
        const db = getFirestore();
        await addDoc(collection(db, 'companies'), {
            companyName: companyData.companyName,
            contactNo: companyData.contactNo,
            email: companyData.email,
            location: companyData.address
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteCompany = async (companyUID) => {
    try {
        const db = getFirestore();
        await deleteDoc(doc(db, 'companies', companyUID));
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async (companyData) => {
    try {
        const db = getFirestore();
        await updateDoc(doc(db, 'companies', companyData.id), companyData);
    } catch (error) {
        console.log(error);
    }
}