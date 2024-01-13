"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = __importDefault(require("../controller/users-controller"));
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.route('/api/register').post(users_controller_1.default.register);
userRouter.route('/api/login').post(users_controller_1.default.login);
exports.default = userRouter;
