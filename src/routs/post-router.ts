import { deletePost, getAllPosts } from './../controller/user-posts-controller';
import  express from 'express';
import { createPost } from 'src/controller/user-posts-controller';
import userMiddleware from 'src/middleware/user-middleware';

export const postRouter = express.Router();

postRouter.post('/create', userMiddleware, createPost);
postRouter.get('/get', userMiddleware, getAllPosts);
postRouter.delete('/delete', userMiddleware, deletePost)