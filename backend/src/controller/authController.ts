import { Request, Response } from "express";
import prisma from "../lib/db";
import { generateTokenAndSetCookie } from "../lib/generateToken";

export const signup = async (req: Request, res: Response) => {

    const { username, email, password } = req.body
    try {
        if (!username || !email || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({
                success: false,
                message: "Password much be more than 6 character"
            });
            return;
        }

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password
            }
        });

        generateTokenAndSetCookie(newUser.id, res);

        res.status(201).json({
            success: true,
            user: newUser,
        })
        return;

    } catch (error) {
        console.log('Error while signup', error);
        res.status(500).json({
            success: false,
            message: 'Error in signup'
        });
        return;
    }
};

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'All field are necessary'
            });
            return;
        }

        const user = await prisma.user.findUnique(email);

        if (!user) {
            res.status(400).json({
                success: false,
                message: 'User not found'
            });
            return;
        }

        if (password !== user?.password) {
            res.status(400).json({
                success: false,
                message: 'Password mismatced'
            })
        }

        generateTokenAndSetCookie(user.id, res);
        const userDetails = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        res.status(201).json({
            success: true,
            user: userDetails
        });
        return;

    } catch (error) {
        console.log('Error while logging', error);
        res.status(500).json({
            status: false,
            message: 'Error while logginging'
        });
        return;
    }
};

export const logout = async (req: Request, res: Response) => {
    res.clearCookie('jwt');
    res.status(200).json({
        success: true,
        message: "logged out successfully"
    });
    return;
};

export const getme = async (req: Request, res: Response) => {
    try {
        res.send({
            succes0s: true,
            user: req.userId
        })
        return;
    } catch (error) {
        console.log('Error in server');
        res.send({
            success: false,
            message: "Error in server"
        })
        return;
    }
}