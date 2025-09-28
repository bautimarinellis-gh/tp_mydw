import express from "express";
import { addDetalleToPedido, getDetallesTemporales, clearDetallesTemporales, removeDetalleFromPedido } from "../controllers/detallePedidoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Rutas protegidas - requieren autenticación
router.post("/", authMiddleware, addDetalleToPedido);
router.get("/", authMiddleware, getDetallesTemporales);
router.delete("/:index", authMiddleware, removeDetalleFromPedido);
router.delete("/", authMiddleware, clearDetallesTemporales);

export default router;
