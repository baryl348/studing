import { DocumentReference, getDoc } from "firebase/firestore";

export const getDataDoc = async <T>(docRef: DocumentReference<T>) => {
    const docSnap = (await getDoc(docRef));
    return docSnap;
}