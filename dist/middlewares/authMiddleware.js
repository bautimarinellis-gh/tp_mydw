"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET;
const jwtAccessExpiresIn = process.env.JWT_EXPIRES_IN;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
const authMiddleware = (req, res, next) => {
    // Buscar accessToken en cookies o en header Authorization
    const accessToken = req.cookies.accessToken || req.headers.authorization?.replace('Bearer ', '');
    if (!accessToken) {
        return res.status(401).json({ message: "Access token requerido" });
    }
    try {
        // Validar el accessToken con la SECRET_KEY y decodificar la información del usuario
        const decoded = jsonwebtoken_1.default.verify(accessToken, SECRET_KEY);
        req.user = { id: decoded._id };
        next();
    }
    catch (error) {
        // Si el accessToken es inválido, intentar renovarlo con refreshToken
        validateRefreshToken(req, res, next);
    }
};
exports.authMiddleware = authMiddleware;
const validateRefreshToken = (req, res, next) => {
    const token = req.cookies.refreshToken;
    if (!token)
        return res.status(401).json({ message: "Token requerido" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtRefreshSecret);
        // Establecer la información del usuario en req.user
        req.user = { id: decoded._id };
        const payload = { _id: decoded._id };
        const options = { expiresIn: jwtAccessExpiresIn };
        const accessToken = jsonwebtoken_1.default.sign(payload, SECRET_KEY, options);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 // 15 minutos
        });
        next();
    }
    catch (err) {
        return res.status(401).json({ message: err.message });
    }
};
