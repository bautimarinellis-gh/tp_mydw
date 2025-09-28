import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshToken, getUser } from "../controllers/usuarioController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registerUser,);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshToken);
router.get("/", getUser);

export default router;
