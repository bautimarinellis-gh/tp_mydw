import { Request, Response } from "express";
import Pedido from "../models/pedidoSchema";
import { getDetalles, clearDetalles, getDetallesLength } from "../utils/detallesTemporales";

export const createPedido = async (req: Request, res: Response) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = (req as any).user?.id || "usuario_temporal";
        
        if (!userId || userId === "usuario_temporal") {
            return res.status(401).json({ 
                error: "Usuario no autenticado" 
            });
        }

        // Verificar que hay detalles temporales para este usuario
        if (getDetallesLength(userId) === 0) {
            return res.status(400).json({ 
                error: "No hay detalles para crear el pedido. Agregue productos primero." 
            });
        }

        const detallesTemporales = getDetalles(userId);

        // Calcular el total sumando todos los subtotales
        const total = detallesTemporales.reduce((sum, detalle) => sum + detalle.subtotal, 0);

        // Crear el pedido con los detalles temporales y el usuario
        const newPedido = await Pedido.create({
            usuario: userId,
            fecha: new Date(),
            total: total,
            detalles: detallesTemporales
        });

        // Limpiar los detalles temporales después de crear el pedido
        clearDetalles(userId);

        res.status(201).json({
            message: "Pedido creado exitosamente",
            pedido: newPedido
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deletePedido = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByIdAndDelete(id);
        if(!pedido){
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.json({ message: "Pedido eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};


export const getPedidos = async (req: Request, res: Response) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = (req as any).user?.id || "usuario_temporal";
        
        if (!userId || userId === "usuario_temporal") {
            return res.status(401).json({ 
                error: "Usuario no autenticado" 
            });
        }

        // Filtrar pedidos solo del usuario autenticado
        const pedidos = await Pedido.find({ usuario: userId }).populate('usuario', 'name email');
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getPedido = async (req: Request, res: Response) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = (req as any).user?.id || "usuario_temporal";
        
        if (!userId || userId === "usuario_temporal") {
            return res.status(401).json({ 
                error: "Usuario no autenticado" 
            });
        }

        const { id } = req.params;
        const pedido = await Pedido.findOne({ _id: id, usuario: userId }).populate('usuario', 'name email');
        
        if(!pedido){
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

