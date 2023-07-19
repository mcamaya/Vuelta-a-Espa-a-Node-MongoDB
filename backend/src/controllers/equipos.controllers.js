import Equipo from "../models/Equipo.js";

const get = async (req, res) => {
    const dbInfo = await Equipo.find();
    res.json(dbInfo);
}

const getOne = async (req, res) => {
    const dbUnicoRegistro = await Equipo.findOne({_id:req.params.id});
    res.json(dbUnicoRegistro);
}

const post = async (req, res) => {
    const nuevo = new Equipo(req.body);
    try {
        const nuevoRegistro = await nuevo.save();
        res.json(nuevoRegistro);
    } catch (error) {
        console.error(error);
    }
}

const deleteOne = async (req, res) => {
    try {
        await Equipo.deleteOne({_id: req.params.id});
        res.json(204).send()
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
}

const update = async (req, res) => {
    try {
        const actualizar = await Equipo.findOne({_id:req.params.id});
        if (req.body.nombre) {
            actualizar.nombre = req.body.nombre;
        }
        if(req.body.entrenador) {
            actualizar.entrenador = req.body.entrenador;
        }
        if(req.body.pais){
            actualizar.pais = req.body.pais;
        }
        if(req.body.patrocinador){
            actualizar.patrocinador = req.body.patrocinador;
        }

        await actualizar.save();
        res.send(actualizar);
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
}

export {
    get,
    getOne,
    post,
    update,
    deleteOne
}