export const helpers = () => ({
    toArray: (value: number | number[]) => {
        if (Array.isArray(value)) {
            return value;
        }
        return [value];
    }
})