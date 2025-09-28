"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pedidoController_1 = require("../controllers/pedidoController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authMiddleware, pedidoController_1.createPedido);
router.delete("/:id", authMiddleware_1.authMiddleware, pedidoController_1.deletePedido);
router.get("/", authMiddleware_1.authMiddleware, pedidoController_1.getPedidos);
router.get("/:id", authMiddleware_1.authMiddleware, pedidoController_1.getPedido);
exports.default = router;
