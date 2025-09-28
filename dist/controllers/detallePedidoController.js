"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDetalleProducto = exports.removeDetalleFromPedido = exports.clearDetallesTemporales = exports.getDetallesTemporales = exports.addDetalleToPedido = void 0;
const detallePedidoSchema_1 = __importDefault(require("../models/detallePedidoSchema"));
const detallesTemporales_1 = require("../utils/detallesTemporales");
const addDetalleToPedido = async (req, res) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = req.user?.id || "usuario_temporal";
        if (!userId || userId === "usuario_temporal") {
            return res.status(401).json({
                error: "Usuario no autenticado"
            });
        }
        const { producto, cantidad, subtotal } = req.body;
        // Validar que se proporcionen todos los campos necesarios
        if (!producto || !cantidad || !subtotal) {
            return res.status(400).json({
                error: "Faltan campos requeridos: producto, cantidad, subtotal"
            });
        }
        // Agregar el detalle al array temporal del usuario
        const nuevoDetalle = {
            producto,
            cantidad,
            subtotal
        };
        (0, detallesTemporales_1.addDetalle)(userId, nuevoDetalle);
        res.status(201).json({
            message: "Detalle agregado al pedido temporal",
            detalle: nuevoDetalle,
            totalDetalles: (0, detallesTemporales_1.getDetallesLength)(userId)
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.addDetalleToPedido = addDetalleToPedido;
const getDetallesTemporales = async (req, res) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = req.user?.id || "usuario_temporal";
        if (!userId || userId === "usuario_temporal") {
            return res.status(401).json({
                error: "Usuario no autenticado"
            });
        }
        const detalles = (0, detallesTemporales_1.getDetalles)(userId);
        res.status(200).json({
            detalles: detalles,
            total: detalles.length
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.getDetallesTemporales = getDetallesTemporales;
const clearDetallesTemporales = async (req, res) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = req.user?.id || "usuario_temporal";
        if (!userId || userId === "usuario_temporal") {
            return res.status(401).json({
                error: "Usuario no autenticado"
            });
        }
        (0, detallesTemporales_1.clearDetalles)(userId);
        res.status(200).json({
            message: "Detalles temporales eliminados"
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.clearDetallesTemporales = clearDetallesTemporales;
const removeDetalleFromPedido = async (req, res) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = req.user?.id || "usuario_temporal";
        if (!userId || userId === "usuario_temporal") {
            return res.status(401).json({
                error: "Usuario no autenticado"
            });
        }
        const { index } = req.params;
        const indexNum = parseInt(index);
        if (isNaN(indexNum)) {
            return res.status(400).json({
                error: "El índice debe ser un número válido"
            });
        }
        const removed = (0, detallesTemporales_1.removeDetalle)(userId, indexNum);
        if (!removed) {
            return res.status(404).json({
                error: "Detalle no encontrado en el índice especificado"
            });
        }
        res.status(200).json({
            message: "Detalle eliminado del pedido temporal",
            totalDetalles: (0, detallesTemporales_1.getDetallesLength)(userId)
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.removeDetalleFromPedido = removeDetalleFromPedido;
const deleteDetalleProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const detalleProducto = await detallePedidoSchema_1.default.findByIdAndDelete(id);
        if (!detalleProducto) {
            return res.status(404).json({ error: "Detalle de producto no encontrado" });
        }
        res.json({ message: "Detalle de producto eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.deleteDetalleProducto = deleteDetalleProducto;
