import express from "express";
import actionlogController from "../controller/actionlog-controller";

const adminRouter = express.Router();

adminRouter.route('/admin/:id')
    .put(actionlogController.updateLog)
    .delete(actionlogController.deleteLog)

export default adminRouter; 