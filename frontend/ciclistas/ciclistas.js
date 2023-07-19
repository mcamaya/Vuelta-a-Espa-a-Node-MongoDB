import { getAll, getOne, postData, deleteData, updateData } from "./api.js";

addEventListener("DOMContentLoaded", cargarRegistros);
const container = document.querySelector('#contenedor-cards');

async function cargarRegistros() {
  const dbRegistros = await getAll();
  console.log(dbRegistros);
  
  
  dbRegistros.forEach(rgt => {
    let {_id, nombre, carrerasCorridas, edad, paisNatal, dni, equipo} = rgt;
    container.innerHTML += `
        <div class="card p-2">
        <div class="d-flex">
          <h3>Nombre:</h3>
          <h6 class="ms-3">${nombre}</h6>
        </div>
        <div class="d-flex">
          <h3>Equipo:</h3>
          <h6 class="ms-3">${equipo}</h6>
        </div>
        <div class="d-flex">
          <h3>Carreras Corridas:</h3>
          <h6 class="ms-3">${carrerasCorridas}</h6>
        </div>
        <div class="d-flex">
          <h3>Edad:</h3>
          <h6 class="ms-3">${edad}</h6>
        </div>
        <div class="d-flex">
          <h3>Pais Natal:</h3>
          <h6 class="ms-3">${paisNatal}</h6>
        </div>
        <div class="d-flex">
          <h3>DNI:</h3>
          <h6 class="ms-3">${dni}</h6>
        </div>

        <div class="d-flex align-items-between mt-5">
          <button class="btn update" data-bs-toggle="modal" data-bs-target="#updateModal" idupdate="${_id}">Editar</button>
          <button class="btn delete" iddelete="${_id}">Eliminar</button>
        </div>

    </div>
    `
  });
}

/* post */
const btnRegistrar = document.querySelector('#btnRegistrar');

btnRegistrar.addEventListener("click", insertarData);

async function insertarData(e) {
  e.preventDefault();
  
  let nombre = document.querySelector('#nombre').value;
  let edad = document.querySelector('#edad').value;
  let equipo = document.querySelector('#equipo').value;
  let carrerasCorridas = document.querySelector('#carrerasCorridas').value;
  let dni = document.querySelector('#dni').value;
  let paisNatal = document.querySelector('#paisNatal').value;

  let nuevoRegistro = {
    nombre,
    edad,
    equipo,
    carrerasCorridas,
    dni,
    paisNatal
    }

    postData(nuevoRegistro);
}

container.addEventListener("click", oneOrAnother);

function oneOrAnother(e){
  if(e.target.classList.contains("delete")){
    eliminarRegistros(e);
  }
  if(e.target.classList.contains("update")){
    launchModalUpt(e);
  }
}

function eliminarRegistros(e){
  if(confirm("¿Seguro desea eliminar este registro?")){
    let id = e.target.getAttribute("iddelete");
    deleteData(id);
    window.location.reload();
  }
}

/* update */
const updateModal = document.querySelector('#updateModal');
async function launchModalUpt(e){
  let idUpdate = e.target.getAttribute("idupdate");
  let {_id, nombre, edad, carrerasCorridas, paisNatal, dni, equipo} = await getOne(idUpdate)

  document.querySelector('#idUpt').value = _id;
  document.querySelector('#nombreUpt').value = nombre;
  document.querySelector('#edadUpt').value = edad;
  document.querySelector('#equipoUpt').value = equipo;
  document.querySelector('#carrerasCorridasUpt').value = carrerasCorridas; 
  document.querySelector('#dniUpt').value = dni;
  document.querySelector('#paisNatalUpt').value = paisNatal;
}

updateModal.addEventListener("submit", actualizarRegistros)

async function actualizarRegistros() {
  let id = document.querySelector('#idUpt').value;
  let nombre = document.querySelector('#nombreUpt').value;
  let edad = document.querySelector('#edadUpt').value;
  let equipo = document.querySelector('#equipoUpt').value;
  let carrerasCorridas = document.querySelector('#carrerasCorridasUpt').value; 
  let dni = document.querySelector('#dniUpt').value;
  let paisNatal = document.querySelector('#paisNatalUpt').value;



  let actualizado = {
    nombre,
    edad,
    equipo,
    carrerasCorridas,
    dni,
    paisNatal
  }

  await updateData(id, actualizado);
}