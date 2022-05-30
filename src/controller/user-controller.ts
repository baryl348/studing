import { db } from './../db/db';
import { NextFunction, Request, Response } from "express";
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJwt = (id:number, userName:string) => {
    return jwt.sign(
        {id, userName},
        process.env.SECRET_KEY as string,
        {expiresIn: '1w'}
    )
}

 export const registrationUser = async (req: Request, res: Response, next: NextFunction) => {
       try {
           const {userName, password} = req.body as {userName: string, password: string};
            // const token = generateJwt(id: 1, userName:data.userName)
           const hashPassword = await bcrypt.hash(password, 5)
            await setDoc(doc(db, 'users', `${userName}`), {
                userName,
                hashPassword
            })
            res.send('Пользователь создан')
       } catch (error) {
           
       }
   }


