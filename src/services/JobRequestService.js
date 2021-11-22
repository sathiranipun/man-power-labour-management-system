import { collection, doc, getFirestore, addDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

export const createJobRequest = async (jobRequest) => {
    const db = getFirestore();
    try {
        const res = await addDoc(collection(db, "jobRequests"), jobRequest)
        console.log('create successfully')
        return res.id;
    } catch (error) {
        console.log(error);
    }
}

export const getjobRequests = async () => {
    const db = getFirestore();
    try {
        const querySnapshot = await getDocs(collection(db, "jobRequests"));
        let jobRequests = []
        querySnapshot.forEach((doc) => {
            let data = { ...doc.data(), id: doc.id }
            jobRequests.push(data)
        });
        return jobRequests;
    } catch (error) {
        console.log(error);
    }
}

export const updateJobRequest = async (jobRequest) => {
    const db = getFirestore();
    try {
        const id = jobRequest.id;
        delete jobRequest.id;
        await setDoc(doc(db, "jobRequests", id), jobRequest)
        console.log('updated successfully')
    } catch (error) {
        console.log(error);
    }
}

export const deleteJobRequest = async (id) => {
    const db = getFirestore();
    try {
        await deleteDoc(doc(db, "jobRequests", id));
        console.log('deleted successfully')
    } catch (error) {
        console.log(error);
    }
}