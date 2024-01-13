"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const actionlog_controller_1 = __importDefault(require("../controller/actionlog-controller"));
const router = express_1.default.Router();
router.route('/api')
    .get(actionlog_controller_1.default.getActionLog)
    .post(actionlog_controller_1.default.insertNewLog);
router.route('/api/user/:user_mail')
    .get(actionlog_controller_1.default.getLogByID);
exports.default = router;
