import { getAll, post } from "./api.js";

addEventListener("DOMContentLoaded", cargarCiclistas);
const contenedor = document.querySelector('#contenedor-cards');

async function cargarCiclistas(){
    const datos = await getAll();
    console.log(datos);
}

/* get */
const ciclistas = await getAll();
ciclistas.forEach(ciclista => {
    contenedor.innerHTML += `
    <div class="col">
            <div class="card shadow-sm">
              <div class="card-body d-flex flex-column align-items-center">
                <p class="card-text"> 
                    <strong>Nombre:</strong> ${ciclista.nombre}
                </p>
                <p class="card-text"> 
                    <strong>Carreras corridas: </strong> ${ciclista.carrerasCorridas}
                </p>
                <p class="card-text"> 
                    <strong>Edad: </strong> ${ciclista.edad}
                </p>
                <p class="card-text"> 
                    <strong>Pais Natal: </strong> ${ciclista.paisNatal}
                </p>
                <p class="card-text"> 
                    <strong>DNI: </strong>${ciclista.dni}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-info">Editar</button>
                    <button type="button" class="btn btn-sm btn-outline-danger">Borrar</button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
    `
});

/* post */
const ingresar = document.querySelector("#insertar");