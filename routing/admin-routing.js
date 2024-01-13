"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const actionlog_controller_1 = __importDefault(require("../controller/actionlog-controller"));
const adminRouter = express_1.default.Router();
adminRouter.route('/api/admin/:id')
    .put(actionlog_controller_1.default.updateLog)
    .delete(actionlog_controller_1.default.deleteLog);
exports.default = adminRouter;
