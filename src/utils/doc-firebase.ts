import { DocumentReference, getDoc } from "firebase/firestore";

export const getDataDoc = async <T>(docRef: DocumentReference<T>) => {
    const docSnap = (await getDoc(docRef));
    return docSnap;
}

export const parseElementArray = (array: string[]) => {
    const result = [];
    let i = 0;
    while (i < array.length) {
        const item = JSON.parse(array[i]);
        result.push(item);
        i++
    }
    return result;
}