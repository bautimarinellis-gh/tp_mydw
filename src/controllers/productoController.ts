import { Request, Response } from "express";
import Producto from "../models/productoSchema";

export const createProducto = async (req: Request, res: Response) => {
    try{
        const nuevoProducto = await Producto.create(req.body);
        res.status(201).json(nuevoProducto);

    }catch(error){
        res.status(500).json({ message: "Error al crear el producto" });
    }
};

export const deleteProducto = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        await Producto.findByIdAndDelete(id);
        res.status(200).json({ message: "Producto eliminado correctamente" });
    }catch(error){
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
};

export const updateProducto = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        await Producto.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Producto actualizado correctamente" });
    }catch(error){
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
};

export const getProductos = async (req: Request, res: Response) => {
    try{
        const productos = await Producto.find();
        res.status(200).json(productos);
    }catch(error){
        res.status(500).json({ message: "Error al obtener los productos" });
    }
};

export const getProductoById = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const producto = await Producto.findById(id);
        res.status(200).json(producto);
    }catch(error){
        res.status(500).json({ message: "Error al obtener el producto" });
    }
};
