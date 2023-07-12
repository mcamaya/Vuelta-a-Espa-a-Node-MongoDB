import mongoose from "mongoose";

const mySchema = mongoose.Schema(

{
    puesto: {
        type: String,
        required: true,
        trim: true
    },
    cantidadEuros: {
        type: Number,
        required: true,
        trim: true
    }
}, 

{
    timestamps: true
}

);

const Premio = mongoose.model("premios", mySchema);

export default Premio;