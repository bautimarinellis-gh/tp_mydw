import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;
const PORT = process.env.PORT!;


app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});


const connectToDb = async () => {
try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB conectado");
    } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error}`);
    process.exit(1);
    }
};

const startServer = async () => {
    await connectToDb();
    app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    });
};

startServer();

