import { getAll, getOne, postData, deleteData, updateData } from "./api.js";

addEventListener("DOMContentLoaded", cargarRegistros);
const container = document.querySelector('#contenedor-cards');

async function cargarRegistros() {
  const dbRegistros = await getAll();
  console.log(dbRegistros);
  
  
  dbRegistros.forEach(rgt => {
    let {_id, equipo, entrenador, patrocinador, pais} = rgt;
    container.innerHTML += `
        <div class="card p-2">
        <div class="d-flex">
          <h3>Nombre:</h3>
          <h6 class="ms-3">${equipo}</h6>
        </div>
        <div class="d-flex">
          <h3>Entrenador:</h3>
          <h6 class="ms-3">${entrenador}</h6>
        </div>
        <div class="d-flex">
          <h3>Patrocinador:</h3>
          <h6 class="ms-3">${patrocinador}</h6>
        </div>
        <div class="d-flex">
          <h3>Pais:</h3>
          <h6 class="ms-3">${pais}</h6>
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
  
  let equipo = document.querySelector('#equipo').value;
  let entrenador = document.querySelector('#entrenador').value;
  let pais = document.querySelector('#pais').value;
  let patrocinador = document.querySelector('#patrocinador').value;

  let nuevoRegistro = {
    equipo,
    entrenador,
    pais,
    patrocinador
    }

    console.log(await postData(nuevoRegistro));
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
  let {_id, equipo, entrenador, patrocinador, pais} = await getOne(idUpdate)

  document.querySelector('#idUpt').value = _id;
  document.querySelector('#equipoUpt').value = equipo;
  document.querySelector('#entrenadorUpt').value = entrenador;
  document.querySelector('#patrocinadorUpt').value = patrocinador;
  document.querySelector('#paisUpt').value = pais;
}

updateModal.addEventListener("submit", actualizarRegistros)

async function actualizarRegistros() {

  let id = document.querySelector('#idUpt').value;
  let equipo = document.querySelector('#equipoUpt').value;
  let entrenador = document.querySelector('#entrenadorUpt').value;
  let pais = document.querySelector('#paisUpt').value; 
  let patrocinador = document.querySelector('#patrocinadorUpt').value;

  let actualizado = {
    equipo,
    entrenador,
    pais,
    patrocinador
  }

    await updateData(id, actualizado);
}