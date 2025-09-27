import express from "express";
import { addDetalleToPedido, getDetallesTemporales, clearDetallesTemporales, removeDetalleFromPedido } from "../controllers/detallePedidoController";

const router = express.Router();

router.post("/", addDetalleToPedido);
router.get("/", getDetallesTemporales);
router.delete("/:index", removeDetalleFromPedido);
router.delete("/", clearDetallesTemporales);

export default router;
