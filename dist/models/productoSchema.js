"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productoSchema = new mongoose_1.default.Schema({
    code: { type: String, required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true },
    stock: { type: Number, required: true },
});
exports.default = mongoose_1.default.model("Producto", productoSchema);
