import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const connectionDB = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Conectado en el server ${connectionDB.connection.host} en el puerto ${connectionDB.connection.port}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default conectarDB;