import express from 'express';
import  { registrationUser } from "../controller/user-controller"

export const userRouter = express.Router();

userRouter.post('/auth');
userRouter.post('/registration', registrationUser);

