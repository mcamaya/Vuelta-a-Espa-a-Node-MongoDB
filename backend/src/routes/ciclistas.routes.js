import express from "express";
import { check } from "express-validator";
import { validateDocuments } from "../middlewares/validate.documents.js";
import Equipo from "../models/Equipo.js";
import { get, getOne, post, deleteOne, update } from "../controllers/ciclistas.controllers.js";

const router = express.Router();

router.get("/", get);
router.get("/:id", getOne);
router.post("/", [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('equipo').custom(async(equipo = '') => {
        const existeEquipo = await Equipo.findOne({equipo});
        if(!existeEquipo){
            throw new Error(`El equipo ${equipo} no está registrado`);
        }
    }),
    validateDocuments
], post);
router.delete("/:id", deleteOne);
router.patch("/:id", update);

export default router;