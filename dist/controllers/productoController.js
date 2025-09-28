"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductoById = exports.getProductos = exports.updateProducto = exports.deleteProducto = exports.createProducto = void 0;
const productoSchema_1 = __importDefault(require("../models/productoSchema"));
const createProducto = async (req, res) => {
    try {
        const nuevoProducto = await productoSchema_1.default.create(req.body);
        res.status(201).json(nuevoProducto);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el producto" });
    }
};
exports.createProducto = createProducto;
const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await productoSchema_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Producto eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
};
exports.deleteProducto = deleteProducto;
const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await productoSchema_1.default.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Producto actualizado correctamente" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
};
exports.updateProducto = updateProducto;
const getProductos = async (req, res) => {
    try {
        const productos = await productoSchema_1.default.find();
        res.status(200).json(productos);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los productos" });
    }
};
exports.getProductos = getProductos;
const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await productoSchema_1.default.findById(id);
        res.status(200).json(producto);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el producto" });
    }
};
exports.getProductoById = getProductoById;
