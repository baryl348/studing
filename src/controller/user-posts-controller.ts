import { getDataDoc, parseElementArray } from './../utils/doc-firebase';
import type { Post } from "src/models/user-post";
import { Request, Response } from "express"
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../db/db";

export const createPost = async(req: Request, res: Response) => {
    try {
        if (!Object.keys(req.body)) {
            res.status(401).json({
                status: '1',
                message: 'Данные не валидны!'
            })
        }
    
        const {title, content, username} = req.body;

        const docRef = doc(db, 'users', `${username}`);
    
        const docSnap = (await getDoc(docRef));
               
        if (!docSnap.exists()) {
          res.status(401).json({
              status: 1,
              message: "Пользователь не найден!"
          })
        }
    
        const post: Record<string, string > = {};
    
        post['title'] = title;
        post['content'] = content;
        post['createTime'] = String(new Date());
    
        const dataDoc = docSnap.data();
    
        if (!dataDoc) {
            res.status(405).json({
                status: 5,
                message: "Пздц походу базе или хз что))"
            })
        }
       console.log(dataDoc);

       
        // @ts-ignore
        updateDoc(docRef, {
            posts: arrayUnion([{ id: new Date().getTime(), value: post }])
        })

        const result = (await getDataDoc(docRef)).data()

        // @ts-ignore
        if (result['posts']) {
            res.status(200).json({
                status: 0,
                posts: parseElementArray(result!['posts']),
            })
            return;
        }
        res.status(200).json({
            status: 0,
            posts: []
        })

    } catch (error) {
        console.error('create post' + ' ' + error);
        res.status(500).json({message: 'Не известная ошибка'})
    }
}

export const getAllPosts = async(req: Request, res: Response) => {
    try {
        const docRef = doc(db, 'users', `${req.body.username}`);
        const docSnap = await getDataDoc(docRef);
        if ( docSnap.exists()) {
           const result = docSnap.data();
           if (result['posts']) {
               res.status(200).json({
                   status: 0,
                   posts: parseElementArray(result['posts']),
               })
               return;
           }
           res.status(200).json({
               status: 0,
               posts: []
           })
        }
        if (!docSnap.exists()) {
            res.status(401).json({
                status: 3,
                message: "Пользователь с таким токеном не найден!"
            });
         }
    } catch (error) {
        console.error('get all posts' + ' ' + error);
        res.status(500).json({
            message: 'Не известная ошибка!'
        })
    }
}

export const deletePost = async(req: Request, res: Response) => {
    try {
        const docRef =  doc(db, 'users', `${req.body.username}`);
        updateDoc(docRef, { posts: arrayRemove(`${req.body.id}`)});
        res.status(200).json({
            status: 0
        })
    } catch (error) {
        console.error('delete post' + ' ' + error);
        res.status(500).json({
            message: 'Произошла не изветсная ошибка при удалении поста'
        })
    }
    
}