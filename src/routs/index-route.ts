import { postRouter } from './post-router';
import express from "express";
import {userRouter} from "./user-route"
export const router =  express.Router();

router.use('/user', userRouter);
router.use('/post', postRouter)