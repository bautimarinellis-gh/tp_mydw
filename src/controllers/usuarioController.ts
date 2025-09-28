import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

import { Request, Response } from "express";
import userModel from "../models/userSchema";
import { CreateUserDto } from "../dto/create_user";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET!;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET!;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN!;

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user : CreateUserDto = req.body;
        const hashPassword = await bcrypt.hash(user.password, 10);
        const newUser = await userModel.create({ ...user, password: hashPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const findUser = await userModel.findOne({ email });

        if(!findUser){
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, findUser.password);

        if(!isMatch){
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        if(!jwtSecret || !jwtRefreshSecret || !jwtExpiresIn){
            return res.status(500).json({ error: "JWT no definido" });
        }

        const payload = { _id: findUser._id.toString(), email: findUser.email };
        const options = { expiresIn: jwtExpiresIn };
        const accessToken = jwt.sign(payload, jwtSecret, options as SignOptions);
        
        const refreshToken = jwt.sign(
            { _id: findUser._id.toString() },
            jwtRefreshSecret as string,
            { expiresIn: "7d" }
        );

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
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    try {
        // Limpiar las cookies
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        
        return res.json({ message: "Logout exitoso" });
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ error: "Refresh token no encontrado" });
        }

        if (!jwtRefreshSecret) {
            return res.status(500).json({ error: "JWT refresh secret no definido" });
        }

        // Verificar el refresh token
        const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as { _id: string };
        
        // Buscar el usuario
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        if (!jwtSecret || !jwtExpiresIn) {
            return res.status(500).json({ error: "JWT secret o expires no definido" });
        }

        // Generar nuevo access token
        const payload = { _id: user._id.toString(), email: user.email };
        const options = { expiresIn: jwtExpiresIn };
        const newAccessToken = jwt.sign(payload, jwtSecret, options as SignOptions);

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
    } catch (error) {
        return res.status(401).json({ error: "Refresh token inválido" });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const usuarios = await userModel.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};