import { db } from './../db/db';
import { NextFunction, Request, Response } from "express";
import { setDoc, doc, getDoc } from 'firebase/firestore';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    responseUserToken,
    responseUserDataIsNotCorrect,
    responseUserNotFound,
    responseUserError, responseUserAlreadyExists, responseUserCreated, responseUserUnauthorized, responseUserPosts
} from "../utils/ResponseEntityUser";

const generateJwt = (username:string) => {
    return jwt.sign(
        {username},
        process.env.SECRET_KEY as string,
        {expiresIn: '1y'}
    )
}

export const registrationUser = async (req: Request<{}, {}, {username: string, password: string}>, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body;
        const docRef = doc(db, 'users', `${username}`);
        const docSnap = (await getDoc(docRef));

        if (docSnap.exists()) {
            responseUserAlreadyExists(res);
            return;
        }

        const hashPassword = await bcrypt.hash(
            password,
            5
        );

        await setDoc(doc(db, 'users', `${username}`), {
            username,
            password: hashPassword
        });

        responseUserCreated(res);
    } catch (error) {
        console.log("Контроллер регистрации:\n" + error);

        responseUserError(
            res,
            "Ошибка во время регистрации"
        )
    }
}

export const authUser = async (req: Request<{}, {}, {username: string, password: string}>, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body;
        const docRef = doc(db, 'users', `${username}`);
        const docSnap = (await getDoc(docRef));

        if (!docSnap.exists()) {
           responseUserNotFound(res);
           return;
        }

        const validPassword = bcrypt.compareSync(
            password,
            docSnap.data()!.password
        );

        if (!validPassword) {
            responseUserDataIsNotCorrect(res);
            return;
        }

        const token = generateJwt(username);

        responseUserToken(
            res,
            token
        );

    } catch (error) {
        console.log("Контроллер авторизации:\n" + error);

        responseUserError(
            res,
            "Ошибка во время авторизации"
        );
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const docRef = doc(db, 'users', `${req.body.username}`);

        const docSnap = (await getDoc(docRef));

        if (!docSnap.exists()) {
            responseUserUnauthorized(res);
            return;
        }

        const users = docSnap.data();

        responseUserPosts(
            res,
            users.username,
            users['posts']
        );
    } catch (error) {
        console.log("Контроллер получения пользователя\n" + error);

        responseUserError(
            res,
            "Ошибка во время получения пользователя!"
        );
    }
}


