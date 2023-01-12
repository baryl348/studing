const setCompleteFlag = (array: any[], identifier: number[]) => {
   return whileSetFlagItem(array, identifier, true);
}

const setNotACompleteFlag = (array: any[], identifier: number[]) => {
    return whileSetFlagItem(array, identifier, false);
}

const whileSetFlagItem = (array: any[], identifier: number[], isTrust: boolean) => {
    const countIdentifier = identifier.length;
    const result = array;
    for (let index = 0; index < array.length; index++) {
        const item = array[index];
        if (item.id === identifier[countIdentifier - 1]) {
            item['isComplete'] = isTrust;
            result[index] = item;
        }
        if (countIdentifier === 0) {
            break;
        }
    }
    return result;
}

export { setCompleteFlag, setNotACompleteFlag }