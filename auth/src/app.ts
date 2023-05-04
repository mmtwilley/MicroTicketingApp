import express from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";
import {errrorHandler ,  NotFoundError } from "@mttickets2023/common"

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";



const app = express();
app.set('trust proxy',true);
app.use(express.json());
app.use(
    cookieSession({
        signed:false,
        secure:process.env.NODE_ENV !=='test'
    })
);


app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', (req, res, next) =>{
    next (new NotFoundError());
});

app.use(errrorHandler);

export {app};