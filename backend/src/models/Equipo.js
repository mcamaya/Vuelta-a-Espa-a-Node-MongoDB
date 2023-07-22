import mongoose from "mongoose";

const mySchema = mongoose.Schema(

{
    equipo: {
        type: String,
        required: true,
        trim: true
    },
    entrenador: {
        type: String,
        required: true,
        trim: true
    },
    pais: {
        type: String,
        required: true,
        trim: true
    },
    patrocinador: {
        type: String,
        required: true,
        trim: true
    }
}, 

{
    timestamps: true
}

);

const Equipo = mongoose.model("equipos", mySchema);

export default Equipo;