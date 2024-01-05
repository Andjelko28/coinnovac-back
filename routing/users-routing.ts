import usersController from "../controller/users-controller";
import express from "express";

const userRouter = express.Router();

userRouter.route('/api/register').post(usersController.register);
userRouter.route('/api/login').post(usersController.login);

export default userRouter;