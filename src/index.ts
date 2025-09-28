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
    res.send("Hello World");
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

