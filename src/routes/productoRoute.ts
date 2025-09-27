import express from "express";
import { createProducto, deleteProducto, updateProducto, getProductos, getProductoById } from "../controllers/productoController";

const router = express.Router();

router.post("/", createProducto);
router.delete("/:id", deleteProducto);
router.put("/:id", updateProducto);
router.get("/", getProductos);
router.get("/:id", getProductoById);

export default router;