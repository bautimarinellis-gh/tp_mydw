import express from "express";
import { createPedido, deletePedido, getPedidos, getPedido } from "../controllers/pedidoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createPedido);
router.delete("/:id", authMiddleware, deletePedido);
router.get("/", authMiddleware, getPedidos);
router.get("/:id", authMiddleware, getPedido);

export default router;