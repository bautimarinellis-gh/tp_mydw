import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    code: { type: String, required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true },
    stock: { type: Number, required: true },
});

export default mongoose.model("Producto", productoSchema);
