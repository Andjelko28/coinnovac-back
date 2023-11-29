import usersService from "../service/users-service";
import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
    const result = await usersService.register(req.body);
    res.send(result);
}

const login = async (req: Request, res: Response) => {
    const result = await usersService.login(req.body);
    res.send(result);
}

export default { register, login }