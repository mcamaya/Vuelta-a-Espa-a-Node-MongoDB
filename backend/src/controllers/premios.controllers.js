import Premio from "../models/Premio.js";

const get = async (req, res) => {
    const dbInfo = await Premio.find();
    res.json(dbInfo);
}

const getOne = async (req, res) => {
    const dbUnicoRegistro = await Premio.find({_id:req.params.id});
    res.json(dbUnicoRegistro);
}

const post = async (req, res) => {
    const nuevo = new Premio(req.body);
    try {
        const nuevoRegistro = await nuevo.save();
        res.json(nuevoRegistro);
    } catch (error) {
        console.error(error);
    }
}

const deleteOne = async (req, res) => {
    try {
        await Premio.deleteOne({_id: req.params.id});
        res.json(204).send()
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
}

const update = async (req, res) => {
    try {
        const actualizar = await Premio.findOne({_id:req.params.id});

        if(req.body.puesto) {
            actualizar.puesto = req.body.puesto;
        }
        if (req.body.cantidadEuros) {
            actualizar.cantidadEuros = req.body.cantidadEuros;
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