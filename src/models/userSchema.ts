import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    edad: { type: Number, required: true },
    password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);