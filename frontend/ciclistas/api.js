import { application } from "express";
import { url } from "inspector";

const urlApi = 'http://localhost:7000/ciclistas';

const getAll = async () => {
    try {
        const data = await fetch(urlApi);
        const ciclistas = await data.json();
        return ciclistas;
    } catch (error) {
        console.log(error);
    }
}

const post = async (registro) => {
    try {
        await fetch(urlApi, {
            method: "POST",
            body: JSON.stringify(registro),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        
    }
}

export {
    getAll,
    post
}