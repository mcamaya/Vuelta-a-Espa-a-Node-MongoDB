const urlApi = 'http://localhost:7777/api/etapas';

const getAll = async () => {
    try {
        const data = await fetch(urlApi);
        const equipos = await data.json();
        return equipos;
    } catch (error) {
        console.log(error);
    }
}

const getOne = async (id) => {
    try {
        const data = await fetch(`${urlApi}/${id}`);
        const equipo = await data.json();
        return equipo;
    } catch (error) {
        console.log(error);
    }
}

const postData = async (registro) => {
    const response = await fetch(urlApi, {
        method: "POST",
        body: JSON.stringify(registro),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(response.ok){
        window.location.reload();
    } else {
        const {errors} = await response.json();
        console.log(errors);
    
        for(let err of errors) {
            alert(err.msg);
        }
    }

}

const deleteData = async (id) => {
    try {
        await fetch(`${urlApi}/${id}`,{
            method: "DELETE"
        } )
    } catch (error) {
      console.log(error);  
    }
}

const updateData = async (id, actualizado) => {
    try {
        await fetch(`${urlApi}/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(actualizado)
        } )
    } catch (error) {
      console.log(error);  
    }
}

export {
    getAll,
    getOne,
    postData,
    deleteData,
    updateData
}