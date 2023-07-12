import conectarDB from "./config/conexion.js";
import dotenv from "dotenv";
import express from "express";

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT;

conectarDB();
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});