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
const register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_connecetion_1.default.query(`insert into users(email,hashed_password, is_admin, is_verified) values(?,?,0,0)`, [user.email, user.hashed_password]);
        const lastInsertedId = result.id;
        const actionLogResult = yield db_connecetion_1.default.query(`insert into actionlog set user_mail = ?`, [lastInsertedId]);
        return actionLogResult;
    }
    catch (e) {
        console.log(e);
        return { succes: false, msg: e.message };
    }
});
const login = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_connecetion_1.default.query(`select * from users where email = ? and hashed_password = ?`, [user.email, user.hashed_password]);
        return result;
    }
    catch (e) {
        return { success: false, msg: e.message };
    }
});
const updateEmailVerificationStatus = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_connecetion_1.default.query(`update users set is_verified = 1 where email = ? and is_verified = 0`, [user.email]);
        if (result.affectedRows > 0) {
            return { success: true, message: 'Email verified' };
        }
        else {
            return { success: false, message: 'User is not verified' };
        }
    }
    catch (e) {
        return { success: false, msg: e.message };
    }
});
const verStatus = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_connecetion_1.default.query(`SELECT is_verified FROM users WHERE email = ?`, [user.email]);
        if (result.length > 0 && result[0].is_verified == 1) {
            return { success: true, message: 'Proceed to login' };
        }
        else {
            return { success: false, message: 'User not found' };
        }
    }
    catch (error) {
        console.error('Failed to check email verification status:', error);
        return { success: false, message: error };
    }
});
exports.default = { register, login, updateEmailVerificationStatus, verStatus };
