import { collection, doc, getFirestore, addDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

export const createJobRequest = async (jobRequest) => {
    const db = getFirestore();
    try {
        const companyId = jobRequest.company.id;
        delete jobRequest.company;
        const res = await addDoc(collection(db, "companies", companyId, "jobRequests"), jobRequest)
        console.log('create successfully')
        return res.id;
    } catch (error) {
        console.log(error);
    }
}

export const getjobRequests =  async(companyList) => {
    const db = getFirestore();
    try {
        let jobRequests = [];
        for(let i=0; i<companyList.length;i++){
            const c= companyList[i];
            const querySnapshot = await getDocs(collection(db, "companies", c.id, "jobRequests"));
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), id: doc.id, company:{name: c.companyName, id: c.id} };
                jobRequests.push(data);
            }); 
        }
        return jobRequests;
    } catch (error) {
        console.log(error);
    }
}

export const updateJobRequest = async (jobRequest) => {
    const db = getFirestore();
    try {
        const id = jobRequest.id;
        const companyId = jobRequest.company.id;
        delete jobRequest.id;
        delete jobRequest.company;
        await setDoc(doc(db, "companies", companyId, "jobRequests", id), jobRequest)
        console.log('updated successfully')
    } catch (error) {
        console.log(error);
    }
}

export const deleteJobRequest = async (id, companyId) => {
    const db = getFirestore();
    try {
        await deleteDoc(doc(db, "companies", companyId, "jobRequests", id));
        console.log('deleted successfully')
    } catch (error) {
        console.log(error);
    }
}