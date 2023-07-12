import Ciclista from "../models/Ciclista.js";

const get = async (req, res) => {
    const dbInfo = await Ciclista.find();
    res.json(dbInfo);
}

const getOne = async (req, res) => {
    const dbUnicoRegistro = await Ciclista.find({_id:req.params.id});
    res.json(dbUnicoRegistro);
}

const post = async (req, res) => {
    const nuevo = new Ciclista(req.body);
    try {
        const nuevoRegistro = await nuevo.save();
        res.json(nuevoRegistro);
    } catch (error) {
        console.error(error);
    }
}

const deleteOne = async (req, res) => {
    try {
        await Ciclista.deleteOne({_id: req.params.id});
        res.json(204).send()
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
}

const update = async (req, res) => {
    try {
        const actualizar = await Ciclista.findOne({_id:req.params.id});

        if(req.body.nombre) {
            actualizar.nombre = req.body.nombre;
        }
        if (req.body.carrerasCorridas) {
            actualizar.carrerasCorridas = req.body.carrerasCorridas;
        }
        if(req.body.edad){
            actualizar.edad = req.body.edad;
        }
        if(req.body.paisNatal){
            actualizar.paisNatal = req.body.paisNatal;
        }
        if(req.body.dni){
            actualizar.dni = req.body.dni;
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