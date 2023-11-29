import actionlogService from "../service/actionlog-service";
import { Request, Response } from "express";


const getActionLog = async (req: Request, res: Response) => {
    const data = await actionlogService.getActionLog();
    res.send(data);
}

const getLogByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await actionlogService.getLogByID(parseInt(id));
    res.send(data);
}

const insertNewLog = async (req: Request, res: Response) => {
    const data = await actionlogService.insertNewLog(req.body);
    res.send(data);
}

const updateLog = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await actionlogService.updateLog(parseInt(id), req.body);
    res.send(data);
}


export default { getActionLog, getLogByID, insertNewLog, updateLog }