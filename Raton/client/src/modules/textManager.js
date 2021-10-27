import { getToken } from "./authManager";

const _apiUrl = "/api/text"

export const getTextById = (id) => {
    return getToken().then((token) => 
        fetch(`${_apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
        );
};

export const addText = (text) => {
    return getToken().then((token) =>
    fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
    }))
}