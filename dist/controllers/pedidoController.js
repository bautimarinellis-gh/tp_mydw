"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPedido = exports.getPedidos = exports.deletePedido = exports.createPedido = void 0;
const pedidoSchema_1 = __importDefault(require("../models/pedidoSchema"));
const productoSchema_1 = __importDefault(require("../models/productoSchema"));
const detallesTemporales_1 = require("../utils/detallesTemporales");
const createPedido = async (req, res) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = req.user?.id || "usuario_temporal";
        if (!userId || userId === "usuario_temporal") {
            return res.status(401).json({
                error: "Usuario no autenticado"
            });
        }
        // Verificar que hay detalles temporales para este usuario
        if ((0, detallesTemporales_1.getDetallesLength)(userId) === 0) {
            return res.status(400).json({
                error: "No hay detalles para crear el pedido. Agregue productos primero."
            });
        }
        const detallesTemporales = (0, detallesTemporales_1.getDetalles)(userId);
        // Convertir códigos de producto a ObjectIds
        const detallesConObjectIds = await Promise.all(detallesTemporales.map(async (detalle) => {
            // Buscar el producto por código
            const producto = await productoSchema_1.default.findOne({ code: detalle.producto });
            if (!producto) {
                throw new Error(`Producto con código ${detalle.producto} no encontrado`);
            }
            return {
                producto: producto._id,
                cantidad: detalle.cantidad,
                subtotal: detalle.subtotal
            };
        }));
        // Calcular el total sumando todos los subtotales
        const total = detallesConObjectIds.reduce((sum, detalle) => sum + detalle.subtotal, 0);
        // Crear el pedido con los detalles convertidos y el usuario
        const newPedido = await pedidoSchema_1.default.create({
            usuario: userId,
            fecha: new Date(),
            total: total,
            detalles: detallesConObjectIds
        });
        // Limpiar los detalles temporales después de crear el pedido
        (0, detallesTemporales_1.clearDetalles)(userId);
        res.status(201).json({
            message: "Pedido creado exitosamente",
            pedido: newPedido
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.createPedido = createPedido;
const deletePedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await pedidoSchema_1.default.findByIdAndDelete(id);
        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.json({ message: "Pedido eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.deletePedido = deletePedido;
const getPedidos = async (req, res) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = req.user?.id || "usuario_temporal";
        if (!userId || userId === "usuario_temporal") {
            return res.status(401).json({
                error: "Usuario no autenticado"
            });
        }
        // Filtrar pedidos solo del usuario autenticado
        const pedidos = await pedidoSchema_1.default.find({ usuario: userId }).populate('usuario', 'name email');
        res.status(200).json(pedidos);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.getPedidos = getPedidos;
const getPedido = async (req, res) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = req.user?.id || "usuario_temporal";
        if (!userId || userId === "usuario_temporal") {
            return res.status(401).json({
                error: "Usuario no autenticado"
            });
        }
        const { id } = req.params;
        const pedido = await pedidoSchema_1.default.findOne({ _id: id, usuario: userId }).populate('usuario', 'name email');
        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.status(200).json(pedido);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.getPedido = getPedido;
