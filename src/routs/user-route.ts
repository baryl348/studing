import express from 'express';
import  { authUser, getUser, registrationUser } from "../controller/user-controller";
import userMiddleware from "../middleware/user-middleware";

export const userRouter = express.Router();

userRouter.post('/auth', authUser);
userRouter.post('/registration', registrationUser);
userRouter.get('/getUser', userMiddleware, getUser)

