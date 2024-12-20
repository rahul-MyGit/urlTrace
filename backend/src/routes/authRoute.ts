import express from "express";
import { getme, logout, signin, signup } from "../controller/authController"

const authRoutes = express.Router();

authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);
authRoutes.post('/logout', logout);
authRoutes.get('/me', getme);


export default authRoutes;