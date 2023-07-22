import { getAll, getOne, postData, deleteData, updateData } from "./api.js";

addEventListener("DOMContentLoaded", cargarRegistros);
const container = document.querySelector('#contenedor-cards');

async function cargarRegistros() {
  const dbRegistros = await getAll();
  console.log(dbRegistros);
  
  
  dbRegistros.forEach(rgt => {
    let {_id, fecha, lugar, recorrido} = rgt;
    container.innerHTML += `
        <div class="card p-2">
        <div class="d-flex">
          <h3>Fecha:</h3>
          <h6 class="ms-3">${fecha}</h6>
        </div>
        <div class="d-flex">
          <h3>Lugar:</h3>
          <h6 class="ms-3">${lugar}</h6>
        </div>
        <div class="d-flex">
          <h3>Recorrido:</h3>
          <h6 class="ms-3">${recorrido}</h6>
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
  let fecha = document.querySelector('#fecha').value;
  let lugar = document.querySelector('#lugar').value;
  let recorrido = document.querySelector('#recorrido').value;
 
  let nuevoRegistro = {
    fecha,
    lugar,
    recorrido
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
  let {_id, fecha, lugar, recorrido} = await getOne(idUpdate)

  document.querySelector('#idUpt').value = _id;
  document.querySelector('#fechaUpt').value = fecha;
  document.querySelector('#lugarUpt').value = lugar;
  document.querySelector('#recorridoUpt').value = recorrido;
}

updateModal.addEventListener("submit", actualizarRegistros)

async function actualizarRegistros() {

  let id = document.querySelector('#idUpt').value;
  let fecha = document.querySelector('#fechaUpt').value;
  let lugar = document.querySelector('#lugarUpt').value;
  let recorrido = document.querySelector('#recorridoUpt').value; 

  let actualizado = {
    fecha,
    lugar,
    recorrido
  }

    await updateData(id, actualizado);
}