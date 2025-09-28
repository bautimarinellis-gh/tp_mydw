"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productoController_1 = require("../controllers/productoController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authMiddleware, productoController_1.createProducto);
router.delete("/:id", authMiddleware_1.authMiddleware, productoController_1.deleteProducto);
router.put("/:id", authMiddleware_1.authMiddleware, productoController_1.updateProducto);
router.get("/", authMiddleware_1.authMiddleware, productoController_1.getProductos);
router.get("/:id", authMiddleware_1.authMiddleware, productoController_1.getProductoById);
exports.default = router;
