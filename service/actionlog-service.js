"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actionlog_repo_1 = __importDefault(require("../repository/actionlog-repo"));
const getActionLog = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield actionlog_repo_1.default.getActionLog();
    console.log(data);
    return data;
});
const getLogByID = (user_mail) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield actionlog_repo_1.default.getLogByID(user_mail);
    // if (data && data.length > 0) {
    //     return {
    //         id: data[0].id,
    //         crypto: data[0].crypto,
    //         currency: data[0].currency,
    //         amount_due: data[0].amount_due,
    //         crypto_adress: data[0].crypto_adress,
    //         status: data[0].status,
    //         updated: data[0].updated,
    //         created: data[0].created,
    //         user_mail: data[0].user_mail
    //     };
    // }
    // return null;
    return data;
});
const insertNewLog = (actionlog) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield actionlog_repo_1.default.insertNewLog(actionlog);
    return data;
});
const updateLog = (id, actionlog) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield actionlog_repo_1.default.updateLog(id, actionlog);
    return data;
});
const deleteLog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield actionlog_repo_1.default.deleteLog(id);
    return data;
});
exports.default = { getActionLog, getLogByID, insertNewLog, updateLog, deleteLog };
