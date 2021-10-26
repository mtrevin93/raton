import { getToken } from "./authManager";

const _dictionary_Api_Key = process.env.REACT_APP_DICTIONARY_API_KEY
const _dictionaryApiUrl = "https://www.dictionaryapi.com/api/v3/references/spanish/json"
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

export const deleteUserWord = (word) => {
    return getToken().then((token) =>
    fetch(`${_apiUrl}/${word.id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }))
}

export const addUserWord = (word) => {
    return getToken().then((token) =>
    fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(word),
    }))
}

export const getTranslation = (word) => {
    return (
        fetch(`${_dictionaryApiUrl}/${word}?key=${_dictionary_Api_Key}`, {
            method: "GET",
        }).then(res => res.json())
    );
};