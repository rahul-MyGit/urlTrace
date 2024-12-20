import express from "express";
import {signup} from "../controller/authController"

const authRoutes = express.Router();

authRoutes.post('/signup', signup);
// authRoutes.post('/signin', singin);
// authRoutes.post('/logout', logout);



export default authRoutes;