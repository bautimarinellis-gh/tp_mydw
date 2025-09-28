"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pedidoSchema = new mongoose_1.default.Schema({
    usuario: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    fecha: { type: Date, required: true },
    total: { type: Number, required: true },
    detalles: [{
            producto: {
                type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model("Pedido", pedidoSchema);
