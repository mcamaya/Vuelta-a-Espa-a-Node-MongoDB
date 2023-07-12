import express from "express";
import { get, getOne, post, deleteOne, update } from "../controllers/ciclistas.controllers.js";

const router = express.Router();

router.get("/", get);
router.get("/:id", getOne);
router.post("/", post);
router.delete("/:id", deleteOne);
router.patch("/:id", update);

export default router;