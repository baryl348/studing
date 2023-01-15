import { deletePost, getAllPosts, createPost, completePost, removeCompletePost } from './../controller/user-posts-controller';
import  express from 'express';
import userMiddleware from '../middleware/user-middleware';

export const postRouter = express.Router();

postRouter.post('/create', userMiddleware, createPost);
postRouter.get('/getPost', userMiddleware, getAllPosts);
postRouter.delete('/delete', userMiddleware, deletePost);
postRouter.put('/set_complete', userMiddleware,  completePost);
postRouter.put('/remove_complete', userMiddleware, removeCompletePost);