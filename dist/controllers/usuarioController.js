"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.refreshToken = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
const registerUser = async (req, res) => {
    try {
        const user = req.body;
        const hashPassword = await bcrypt_1.default.hash(user.password, 10);
        const newUser = await userSchema_1.default.create({ ...user, password: hashPassword });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await userSchema_1.default.findOne({ email });
        if (!findUser) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }
        const isMatch = await bcrypt_1.default.compare(password, findUser.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        if (!jwtSecret || !jwtRefreshSecret || !jwtExpiresIn) {
            return res.status(500).json({ error: "JWT no definido" });
        }
        const payload = { _id: findUser._id.toString(), email: findUser.email };
        const options = { expiresIn: jwtExpiresIn };
        const accessToken = jsonwebtoken_1.default.sign(payload, jwtSecret, options);
        const refreshToken = jsonwebtoken_1.default.sign({ _id: findUser._id.toString() }, jwtRefreshSecret, { expiresIn: "7d" });
        // Configurar cookies para persistir los tokens
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 1000
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
        });
        return res.json({
            message: "Login exitoso",
            accessToken,
            refreshToken,
            user: {
                id: findUser._id,
                email: findUser.email
            }
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    try {
        // Limpiar las cookies
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.json({ message: "Logout exitoso" });
    }
    catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
exports.logoutUser = logoutUser;
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).json({ error: "Refresh token no encontrado" });
        }
        if (!jwtRefreshSecret) {
            return res.status(500).json({ error: "JWT refresh secret no definido" });
        }
        // Verificar el refresh token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, jwtRefreshSecret);
        // Buscar el usuario
        const user = await userSchema_1.default.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }
        if (!jwtSecret || !jwtExpiresIn) {
            return res.status(500).json({ error: "JWT secret o expires no definido" });
        }
        // Generar nuevo access token
        const payload = { _id: user._id.toString(), email: user.email };
        const options = { expiresIn: jwtExpiresIn };
        const newAccessToken = jsonwebtoken_1.default.sign(payload, jwtSecret, options);
        // Actualizar la cookie del access token
        res.cookie('accessToken', newAccessToken, {
            httpOnly: false, // Cambiado a false para poder ver en el navegador
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 1000
        });
        return res.json({
            message: "Token renovado exitosamente",
            accessToken: newAccessToken
        });
    }
    catch (error) {
        return res.status(401).json({ error: "Refresh token inválido" });
    }
};
exports.refreshToken = refreshToken;
const getUser = async (req, res) => {
    try {
        const usuarios = await userSchema_1.default.find();
        res.status(200).json(usuarios);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.getUser = getUser;
