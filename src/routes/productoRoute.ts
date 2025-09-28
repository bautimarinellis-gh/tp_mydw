import express from "express";
import { createProducto, deleteProducto, updateProducto, getProductos, getProductoById } from "../controllers/productoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Rutas protegidas - requieren autenticación
router.post("/", authMiddleware, createProducto);
router.delete("/:id", authMiddleware, deleteProducto);
router.put("/:id", authMiddleware, updateProducto);
router.get("/", authMiddleware, getProductos);
router.get("/:id", authMiddleware, getProductoById);

export default router;