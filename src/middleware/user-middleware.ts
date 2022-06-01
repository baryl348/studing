import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
    
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization!.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"});
        }
        const decodedData = jwt.verify(token, process.env.SECRET_KEY!)   
        // @ts-ignore
        req.username = decodedData;
        next()
    } catch (error) {
        console.log("Юзер миддлеваре" + error);
        res.status(403).json({message: "Пользователь не авторизован"});
    }
}