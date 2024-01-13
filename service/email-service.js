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
const nodemailer_1 = __importDefault(require("nodemailer"));
// const transporter = nodeMailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'andjelkofustic99@gmail.com',
//         pass: 'zmsb ebbf rmhh llhw'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });
// const token = jwt.sign({
//     data: 'Token Data'
// }, 'SECRET', { expiresIn: '10m' }
// );
// const mailConfigurations = {
//     from: 'andjelkofustic99@gmail.com',
//     to: 'andjelkofustic99@gmail.com',
//     subject: 'Email verification',
//     text: `Verify on this link  http://localhost:3000/verify/${token}`
// }
// transporter.sendMail(mailConfigurations, function (error: any, info) {
//     if (error) throw Error(error);
//     console.log('Email Sent Successfully');
//     console.log(info);
// });
const sendVerificationEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'andjelkofustic99@gmail.com',
            pass: 'anbt vpil swzg nsbj' //'zmsb ebbf rmhh llhw'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const mailConfigurations = {
        from: 'andjelkofustic99@gmail.com',
        to: 'andjelkofustic99@gmail.com',
        subject: 'Email verification',
        text: `Verify on this link  http://localhost:3000/verify/${token}`
    };
    try {
        const info = yield transporter.sendMail(mailConfigurations);
        console.log('Email Sent Successfully');
        console.log(info);
    }
    catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
});
exports.default = { sendVerificationEmail };
