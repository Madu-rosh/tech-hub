// src/utils/Auth.ts

// Function to save token to local storage
export const saveToken = (token: string) => {
    localStorage.setItem('jwtToken', token);
};

// Function to get the token from local storage
export const getToken = (): string | null => {
    return localStorage.getItem('jwtToken');
};

// Function to remove the token from local storage
export const removeToken = () => {
    localStorage.removeItem('jwtToken');
};
