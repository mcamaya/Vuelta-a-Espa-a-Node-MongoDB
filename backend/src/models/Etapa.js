import mongoose from "mongoose";

const mySchema = mongoose.Schema(

{
    fecha: {
        type: String,
        required: true,
        trim: true
    },
    lugar: {
        type: String,
        required: true,
        trim: true
    },
    recorrido: {
        type: String,
        required: true,
        trim: true
    }
}, 

{
    timestamps: true
}

);

const Etapa = mongoose.model("etapas", mySchema);

export default Etapa;