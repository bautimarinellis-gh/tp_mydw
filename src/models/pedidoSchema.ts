import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fecha: { type: Date, required: true },
    total: { type: Number, required: true },
    detalles: [{
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Producto",
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        subtotal: {
            type: Number,
            required: true
        }
    }]
});

export default mongoose.model("Pedido", pedidoSchema);