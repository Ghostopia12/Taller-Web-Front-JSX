export const SaveToStorage = (key, value) => {
    localStorage.setItem(key, value);
};

export const GetFromStorage = (key) => {
    return localStorage.getItem(key);
}