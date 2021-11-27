import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "@firebase/firestore";

export const getAllPayments = async (jobRequests, setPayments) => {
    const db = getFirestore();
    try {
        const allPayments = (await getDocs(collection(db, 'payments'))).docs.map(e => ({ id: e.id, ...e.data() }));
        const paymentsArr = [];
        jobRequests.forEach(e => {
            paymentsArr.push(allPayments.find(f => f.companyId === e.company.id && f.jobId === e.id) || null);
        });
        setPayments(paymentsArr);
    } catch (err) {
        console.log(err);
        setPayments([]);
    }
}

export const addNewPayment = async (payment, payments, setPayments, index) => {
    const db = getFirestore();
    try {
        const ref = await addDoc(collection(db, 'payments'), payment);
        payments[index] = { id: ref.id, ...payment };
        setPayments(payments);
    } catch (err) {
        console.log(err);
    }
}

export const updatePayment = async (id, payment, payments, setPayments, index) => {
    const db = getFirestore();
    try {
        await setDoc(doc(db, 'payments', id), payment);
        payments[index] = { id, ...payment };
        setPayments(payments);
    } catch (err) {
        console.log(err);
    }
}

export const deletePayment = async (id, payments, setPayments, index) => {
    const db = getFirestore();
    try {
        await deleteDoc(doc(db, 'payments', id));
        payments[index] = null;
        setPayments(payments);
    } catch (err) {
        console.log(err);
    }
}