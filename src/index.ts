import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import productoRoutes from "./routes/productoRoute";
import detallePedidoRoutes from "./routes/detallePedidoRoute";
import pedidoRoutes from "./routes/pedidoRoute";
import usuarioRoutes from "./routes/usuarioRoute";

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI!;
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send(`
    <h1>E-commerce Backend API</h1>    
    <h3>Endpoints:</h3>
    <ul>
        <li>POST /api/usuarios/register - Registro</li>
        <li>POST /api/usuarios/login - Login</li>
        <li>GET /api/productos - Productos</li>
        <li>POST /api/detalles/ - Carrito</li>
        <li>POST /api/pedidos/ - Pedidos</li>
    </ul>
    `);
});

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/detalles", detallePedidoRoutes);
app.use("/api/pedidos", pedidoRoutes);

const connectToDb = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(" MongoDB conectado");
    } catch (error) {
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
    } catch (error) {
        console.error(" Error al iniciar el servidor:", error);
        process.exit(1);
    }
};


startServer();

