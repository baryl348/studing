import { db } from './../db/db';
import { NextFunction, Request, Response } from "express";
import { collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { parseElementArray } from '..//utils/doc-firebase';

const generateJwt = (username:string) => {
    return jwt.sign(
        {username},
        process.env.SECRET_KEY as string,
        {expiresIn: '1w'}
    )
}

 export const registrationUser = async (req: Request<{}, {}, {username: string, password: string}>, res: Response, next: NextFunction) => {
       try {
           const {username, password} = req.body;
           const docRef = doc(db, 'users', `${username}`);
           const docSnap = (await getDoc(docRef));
           
             if (docSnap.exists()) {
               res.status(400).json({
                   status: 2,
                   message: "Такой пользователь уже существует!"
               })
             }
          
            //   const token = generateJwt(id: 1, userName:data.userName)
              const hashPassword = await bcrypt.hash(password, 5);
        //    console.log( collection(db, 'users', `${userName}`));
            
            await setDoc(doc(db, 'users', `${username}`), {
                username,
                password: hashPassword
            });
            if (!docSnap.exists()) {
            res.json({
                status: 0,
                message: 'Пользователь успешно создан!' 
            })
            }
           
       } catch (error) {
           console.log("Контроллер регистрации:" + error);
           res.status(400).json({
            status: 3,
            error: 400,
            message: "Ошибка во время авторизации"
        })
       }
   }

  export const authUser = async (req: Request<{}, {}, {username: string, password: string}>, res: Response, next: NextFunction) => {
      try {
        const {username, password} = req.body;
        const docRef = doc(db, 'users', `${username}`);
        const docSnap = (await getDoc(docRef));

        if (!docSnap.exists()) {
            res.status(400).json({
                status: 3,
                message: "Пользователь не найден!"
            })
        }


        const validPassword = bcrypt.compareSync(password, docSnap.data()!.password);

        if (!validPassword) {
            res.status(400).json({
                status: 1,
                message: "Введен не правильно пароль или имя пользователя!"
            })
        }

        const token = generateJwt(username);
        if (docSnap.exists()) {
            res.json({
                status: 0,
                message: "Успешная авторизация!",
                token,
            });
        }
      } catch (error) {
        console.log("Контроллер авторизации:" + error);
        res.status(400).json({
            status: 3,
            error: 400,
            message: "Ошибка во время авторизации"
        })
      }
  }

 export const getUser = async (req: Request, res: Response) => {
    try {
        const docRef = doc(db, 'users', `${req.body.username}`);

        const docSnap = (await getDoc(docRef));
         if (docSnap.exists()) {
            const users = docSnap.data()
            if (users['posts']) {
                res.status(200).json({
                    username: users.username, //todo если не указывать тело, то север виснит нахуй
                    posts: parseElementArray(users['posts'])
                })
            }
            res.status(200).json({
                username: users.username,
                posts: [] //todo если не указывать тело, то север виснит нахуй
            })
         }
         if (!docSnap.exists()) {
            res.status(401).json({
                status: 3,
                message: "Пользователь с таким токеном не найден!"
            });
         }
            
    } catch (error) {
        console.log("Контроллер получения пользователя" + error)
        res.status(500).json({message: "Не известная ошибка"})
    }
}


