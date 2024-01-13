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
const db_connecetion_1 = __importDefault(require("../common/db-connecetion"));
const getActionLog = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_connecetion_1.default.query('select * from actionlog'); // Vraca cijelu tabelu action log
        return data;
    }
    catch (e) {
        return e;
    }
});
const getLogByID = (user_mail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_connecetion_1.default.query(`select * from actionlog where user_mail = ?`, [user_mail]);
        return data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
});
const insertNewLog = (actionlog) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_connecetion_1.default.query(`insert into actionlog(crypto, currency, amount_due, crypto_adress, status,user_mail, created, updated) values(?,?,?,?,?,?, now(), now())`, [actionlog.crypto, actionlog.currency, actionlog.amount_due, actionlog.crypto_adress, actionlog.status, actionlog.user_mail]);
        return result;
    }
    catch (e) {
        console.log(e);
        return { succes: false, msg: e.message };
    }
});
const updateLog = (id, actionlog) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_connecetion_1.default.query(`update actionlog set crypto = ?, currency = ?, amount_due = ?, crypto_adress = ?, status = ? where id = ?`, [actionlog.crypto, actionlog.currency, actionlog.amount_due, actionlog.crypto_adress, actionlog.status, id]);
        return result;
    }
    catch (e) {
        return { success: false, msg: e.message };
    }
});
const deleteLog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_connecetion_1.default.query(`delete from actionlog where id = ?`, [id]);
        return { succes: true };
    }
    catch (e) {
        return { succes: false, msg: e.message };
    }
});
exports.default = { getActionLog, insertNewLog, updateLog, getLogByID, deleteLog };
