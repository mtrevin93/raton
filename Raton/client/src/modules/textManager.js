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

export const getTextByIdNoWords = (id) => {
    return getToken().then((token) => 
        fetch(`${_apiUrl}/NoWords/${id}`, {
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
    export const updateText = (text) => {
        return getToken().then((token) =>
        fetch(`${_apiUrl}/${text.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(text),
        }))
    }

    export const getTexts = () => {
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

    export const deleteText = (textId) => {
        return getToken().then((token) =>
        fetch(`${_apiUrl}/${textId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }))
    }

