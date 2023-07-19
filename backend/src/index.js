import dotenv from "dotenv";
import { Server } from "./models/Server.js";

import ciclistasRouter from "./routes/ciclistas.routes.js";
import equiposRouter from "./routes/equipos.routes.js";
import etapasRouter from "./routes/etapas.routes.js";
import premiosRouter from "./routes/premios.routes.js";

dotenv.config();

const server = new Server;
server.listen();

const ciclistasRoutes = ["/api/ciclistas", ciclistasRouter];
const equiposRoutes = ["/api/equipos", equiposRouter];
const etapasRoutes = ["/api/etapas", etapasRouter];
const premiosRoutes = ["/api/premios", premiosRouter];

server.routes(ciclistasRoutes, equiposRoutes, etapasRoutes, premiosRoutes);