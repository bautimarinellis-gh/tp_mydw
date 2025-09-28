import { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload } from "../types/type";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET!;
const jwtAccessExpiresIn = process.env.JWT_EXPIRES_IN!; 
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET!;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    
    try {
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        validateRefreshToken(req, res, next);
    }
};

const validateRefreshToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken;

    if (!token) return res.status(401).json({ message: "Token requerido" });

    try {
        const decoded = jwt.verify(token, jwtRefreshSecret) as JwtPayload;

        const payload = { _id: decoded._id };
        const options = { expiresIn: jwtAccessExpiresIn };
        const accessToken = jwt.sign(payload, SECRET_KEY, options as SignOptions);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 1000 
        });

        next();
    } catch (err) {
        return res.status(401).json({ message: (err as Error).message });
    }
};