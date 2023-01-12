import { responseNotFound } from "./ResponseEntityHelper"
import {Response} from "express";

const postNotFound = (response: Response, message?: string) => {
    const responseBody = {
        status: 3,
        message: message || "Пост не найден"
    }
    
    responseNotFound(
        response,
        responseBody
    )
}

export { postNotFound }