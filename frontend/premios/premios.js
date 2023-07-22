import { getAll, getOne, postData, deleteData, updateData } from "./api.js";

addEventListener("DOMContentLoaded", cargarRegistros);
const container = document.querySelector('#contenedor-cards');

async function cargarRegistros() {
  const dbRegistros = await getAll();
  console.log(dbRegistros);
  
  
  dbRegistros.forEach(rgt => {
    let {_id, puesto, cantidadEuros} = rgt;
    container.innerHTML += `
        <div class="card p-2">
        <div class="d-flex">
          <h3>Puesto:</h3>
          <h6 class="ms-3">${puesto}</h6>
        </div>
        <div class="d-flex">
          <h3>Cantidad Euros:</h3>
          <h6 class="ms-3">${cantidadEuros}</h6>
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
  let puesto = document.querySelector('#puesto').value;
  let cantidadEuros = document.querySelector('#cantidadEuros').value;
 
  let nuevoRegistro = {
    puesto,
    cantidadEuros
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
  let {_id,  puesto, cantidadEuros} = await getOne(idUpdate)

  document.querySelector('#idUpt').value = _id;
  document.querySelector('#puestoUpt').value = puesto;
  document.querySelector('#cantidadEurosUpt').value = cantidadEuros;
}

updateModal.addEventListener("submit", actualizarRegistros)

async function actualizarRegistros() {

  let id = document.querySelector('#idUpt').value;
  let puesto = document.querySelector('#puestoUpt').value;
  let cantidadEuros = document.querySelector('#cantidadEurosUpt').value;

  let actualizado = {
    puesto,
    cantidadEuros
  }

    await updateData(id, actualizado);
}