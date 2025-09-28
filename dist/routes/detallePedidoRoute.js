"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const detallePedidoController_1 = require("../controllers/detallePedidoController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authMiddleware, detallePedidoController_1.addDetalleToPedido);
router.get("/", authMiddleware_1.authMiddleware, detallePedidoController_1.getDetallesTemporales);
router.delete("/:index", authMiddleware_1.authMiddleware, detallePedidoController_1.removeDetalleFromPedido);
router.delete("/", authMiddleware_1.authMiddleware, detallePedidoController_1.clearDetallesTemporales);
exports.default = router;
