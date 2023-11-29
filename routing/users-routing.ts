import usersController from "../controller/users-controller";
import express from "express";
import usersService from "../service/users-service";

const userRouter = express.Router();

userRouter.route('/register').post(usersController.register);
userRouter.route('/login').post(usersController.login);

export default userRouter;