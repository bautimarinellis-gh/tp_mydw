"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const productoRoute_1 = __importDefault(require("./routes/productoRoute"));
const detallePedidoRoute_1 = __importDefault(require("./routes/detallePedidoRoute"));
const pedidoRoute_1 = __importDefault(require("./routes/pedidoRoute"));
const usuarioRoute_1 = __importDefault(require("./routes/usuarioRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/usuarios", usuarioRoute_1.default);
app.use("/api/productos", productoRoute_1.default);
app.use("/api/detalles", detallePedidoRoute_1.default);
app.use("/api/pedidos", pedidoRoute_1.default);
const connectToDb = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log(" MongoDB conectado");
    }
    catch (error) {
        console.error(` Error de conexión a MongoDB: ${error}`);
        process.exit(1);
    }
};
const startServer = async () => {
    try {
        await connectToDb();
        app.listen(PORT, () => {
            console.log(` Servidor corriendo en puerto ${PORT}`);
        });
    }
    catch (error) {
        console.error(" Error al iniciar el servidor:", error);
        process.exit(1);
    }
};
startServer();
