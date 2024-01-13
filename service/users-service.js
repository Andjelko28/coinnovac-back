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
const users_repo_1 = __importDefault(require("../repository/users-repo"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_service_1 = __importDefault(require("./email-service"));
// const register = async (user: any) => {
//     // user => username, password
//     // od password-a dobijemo hashedPassword
//     user.hashed_password = crypto.createHash('md5').update(user.password).digest('hex');
//     const result = await usersRepo.register(user);
//     if (result.affectedRows > 0) {
//         // user je kreiran, kreiran token za njega i posalji ga u odgovor
//         const token = jwt.sign({
//             email: user.email,
//             isAdmin: false
//         }, 'SECRET');
//         await usersRepo.checkEmailVerification(user.email);
//         try {
//             await emailService.sendVerificationEmail(user.email, token);
//             return { success: true, token };
//         } catch (emailError) {
//             console.error('Failed to send verification email:', emailError);
//             return { success: false, result, message: 'Failed to send verification email' };
//         }
//     } else {
//         // ovo znaci nije kreiran
//         return { succes: false, result, msessage: 'Failed to send link' }
//     }
// }
const register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Kreiranje hashed_password
    user.hashed_password = crypto_1.default.createHash('md5').update(user.password).digest('hex');
    // Registrovanje korisnika
    const result = yield users_repo_1.default.register(user);
    if (result.affectedRows > 0) {
        // Kreiranje tokena za korisnika
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
            isAdmin: false
        }, 'SECRET');
        try {
            yield email_service_1.default.sendVerificationEmail(user.email, token);
            return { success: true, token };
        }
        catch (e) {
            console.error('Failed to send email', e);
            return { success: false, result };
        }
        finally {
            return { success: true, token };
        }
    }
    else {
        // Ako nije uspelo kreiranje korisnika
        return { success: false, message: 'Failed to create user' };
    }
});
const login = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.hashed_password = crypto_1.default.createHash('md5').update(user.password).digest('hex');
    const result = yield users_repo_1.default.login(user);
    if (result && result.length > 0) {
        const userFromDb = result[0];
        if (userFromDb.is_verified === 1) {
            // ovo znaci da je ulogovan
            const token = jsonwebtoken_1.default.sign({
                email: user.email,
                isAdmin: result[0].is_admin == 1 ? true : false,
            }, 'SECRET');
            console.log(result);
            return { succes: true, token, message: 'User is verified' };
        }
        else {
            console.log(result);
            return { succes: false, result, message: 'User is not verified' };
        }
    }
    else {
        console.log(result);
        return { succes: false, result, message: 'User is not verified' };
    }
});
exports.default = { register, login };
