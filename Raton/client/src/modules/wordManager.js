import { getToken } from "./authManager";

const _apiUrl = "/api/word"

export const getUserWords = () => {
    return getToken().then((token) => 
    fetch(`${_apiUrl}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }).then (res => res.json())
    );
};