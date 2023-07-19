import Etapa from "../models/Etapa.js";

const get = async (req, res) => {
    const dbInfo = await Etapa.find();
    res.json(dbInfo);
}

const getOne = async (req, res) => {
    const dbUnicoRegistro = await Etapa.findOne({_id:req.params.id});
    res.json(dbUnicoRegistro);
}

const post = async (req, res) => {
    const nuevo = new Etapa(req.body);
    try {
        const nuevoRegistro = await nuevo.save();
        res.json(nuevoRegistro);
    } catch (error) {
        console.error(error);
    }
}

const deleteOne = async (req, res) => {
    try {
        await Etapa.deleteOne({_id: req.params.id});
        res.json(204).send()
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
}

const update = async (req, res) => {
    try {
        const actualizar = await Etapa.findOne({_id:req.params.id});

        if(req.body.fecha) {
            actualizar.fecha = req.body.fecha;
        }
        if (req.body.lugar) {
            actualizar.lugar = req.body.lugar;
        }
        if(req.body.recorrido){
            actualizar.recorrido = req.body.recorrido;
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