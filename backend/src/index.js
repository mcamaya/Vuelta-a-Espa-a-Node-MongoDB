import conectarDB from "./config/conexion.js";
import dotenv from "dotenv";
import express from "express";
import ciclistasRouter from "./routes/ciclistas.routes.js";
import equiposRouter from "./routes/equipos.routes.js";
import etapasRouter from "./routes/etapas.routes.js";
import premiosRouter from "./routes/premios.routes.js";

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT;

conectarDB();
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.use("/ciclistas", ciclistasRouter);
app.use("/equipos", equiposRouter);
app.use("/etapas", etapasRouter);
app.use("/premios", premiosRouter);