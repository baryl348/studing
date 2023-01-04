import { deletePost, getAllPosts, createPost } from './../controller/user-posts-controller';
import  express from 'express';
import userMiddleware from '../middleware/user-middleware';

export const postRouter = express.Router();

postRouter.post('/create', userMiddleware, createPost);
postRouter.get('/getPost', userMiddleware, getAllPosts);
postRouter.delete('/delete', userMiddleware, deletePost)