const getItemFromLocalStorage = (key: string) => {
    return localStorage.getItem(key)
}

const setItemToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key)
}

const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export { getItemFromLocalStorage, setItemToLocalStorage, removeFromLocalStorage, debounce }