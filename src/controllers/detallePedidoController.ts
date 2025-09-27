import { Request, Response } from "express";
import detallePedido from "../models/detallePedidoSchema";
import { addDetalle, getDetalles, clearDetalles, getDetallesLength, removeDetalle } from "../utils/detallesTemporales";

export const addDetalleToPedido = async (req: Request, res: Response) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = (req as any).user?.id || "usuario_temporal";
        
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
        
        addDetalle(userId, nuevoDetalle);
        
        res.status(201).json({ 
            message: "Detalle agregado al pedido temporal",
            detalle: nuevoDetalle,
            totalDetalles: getDetallesLength(userId)
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getDetallesTemporales = async (req: Request, res: Response) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = (req as any).user?.id || "usuario_temporal";
        
        if (!userId || userId === "usuario_temporal") {
            return res.status(401).json({ 
                error: "Usuario no autenticado" 
            });
        }

        const detalles = getDetalles(userId);
        res.status(200).json({
            detalles: detalles,
            total: detalles.length
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const clearDetallesTemporales = async (req: Request, res: Response) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = (req as any).user?.id || "usuario_temporal";
        
        if (!userId || userId === "usuario_temporal") {
            return res.status(401).json({ 
                error: "Usuario no autenticado" 
            });
        }

        clearDetalles(userId);
        res.status(200).json({ 
            message: "Detalles temporales eliminados" 
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const removeDetalleFromPedido = async (req: Request, res: Response) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = (req as any).user?.id || "usuario_temporal";
        
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

        const removed = removeDetalle(userId, indexNum);
        
        if (!removed) {
            return res.status(404).json({ 
                error: "Detalle no encontrado en el índice especificado" 
            });
        }

        res.status(200).json({ 
            message: "Detalle eliminado del pedido temporal",
            totalDetalles: getDetallesLength(userId)
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteDetalleProducto = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const detalleProducto = await detallePedido.findByIdAndDelete(id);
        if(!detalleProducto){
            return res.status(404).json({ error: "Detalle de producto no encontrado" });
        }
        res.json({ message: "Detalle de producto eliminado correctamente" });
    }catch(error){
        res.status(500).json({ error: error });
    }
};