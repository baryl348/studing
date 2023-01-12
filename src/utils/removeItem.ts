const removeItem = (array: any[], identifier: number[]) => {
    let countItems = identifier.length;
    let isFindItem = false;
    const result = array;
    for (let index = 0; index < array.length; index++) {
        const item = array[index];
        if (item.id === identifier[countItems - 1]) {
            result.splice(index, 1);
            countItems--
            if (!isFindItem) {
                isFindItem = true;
            }
        }
        if (countItems === 0) {
            break;
        }  
    }
    if (!isFindItem) {
        return 'Пост не найден'
    }
    return result;
}

export { removeItem }