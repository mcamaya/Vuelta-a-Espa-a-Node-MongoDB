import express from "express";
import cors from "cors";
import conectarDB from "../config/conexion.js";

class Server {
    constructor(){
        this.port = process.env.PORT
        this.app = express();
        this.middlewares();
        this.conectarDatabase();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes(ciclistas, equipos, etapas, premios){
        this.app.use(...ciclistas);
        this.app.use(...equipos);
        this.app.use(...etapas);
        this.app.use(...premios);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }

    async conectarDatabase(){
        await conectarDB();
    }

}

export {Server};