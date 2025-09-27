import express from "express";
import { createPedido, deletePedido, getPedidos, getPedido } from "../controllers/pedidoController";

const router = express.Router();

router.post("/", createPedido);
router.delete("/:id", deletePedido);
router.get("/", getPedidos);
router.get("/:id", getPedido);

export default router;