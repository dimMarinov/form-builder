const getItemFromLocalStorage = (key: string) => {
    return localStorage.getItem(key)
}

const setItemFromLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key)
}

export { getItemFromLocalStorage, setItemFromLocalStorage, removeFromLocalStorage }