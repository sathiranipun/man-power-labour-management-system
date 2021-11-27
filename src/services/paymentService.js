import { addDoc, collection, doc, getDocs, getFirestore, updateDoc } from "@firebase/firestore";

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
        payments[index] = {
            ...payment,
            id: ref.id
        };
        setPayments(payments);
    } catch (err) {
        console.log(err);
    }
}

export const updatePayment = async (id, payment, payments, setPayments, index) => {
    const db = getFirestore();
    try {
        await updateDoc(doc(db, 'payments', id), payment);
        payments[index] = payment;
        setPayments(payments);
    } catch (err) {
        console.log(err);
    }
}