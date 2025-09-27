import mongoose from "mongoose";

const detallePedidoSchema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
    cantidad: {type: Number, required: true},
    subtotal: {type: Number, required: true}
});

export default mongoose.model("DetallePedido", detallePedidoSchema);

