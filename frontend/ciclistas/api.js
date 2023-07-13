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

export {
    getAll
}