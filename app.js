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
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Importovanje DB konekcije
const db_connecetion_1 = __importDefault(require("./common/db-connecetion"));
db_connecetion_1.default.initialize()
    .then(() => { console.log('Connected to DB!'); }) // potvrda da je konektovano na bazu
    .catch((err) => { console.log(err); }); // vraca error
app.listen(3000, () => {
    // Izvrsavanje nakon pokretanja servera
    console.log('Server is listening at port 3000;');
});
// Import ruta
const actionlog_routing_1 = __importDefault(require("./routing/actionlog-routing"));
app.use('/table', actionlog_routing_1.default);
const users_routing_1 = __importDefault(require("./routing/users-routing"));
app.use(users_routing_1.default);
const admin_routing_1 = __importDefault(require("./routing/admin-routing"));
app.use(admin_routing_1.default);
app.get('/verify/:token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    jsonwebtoken_1.default.verify(token, 'SECRET', (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
            res.send('Verification failed');
        }
        else {
            const userEmail = decoded.email;
            try {
                // Odmah azuriraj status verifikacije u bazi podataka
                const updateResult = yield db_connecetion_1.default.query('UPDATE users SET is_verified = 1 WHERE email = ? and is_verified = 0', [userEmail]);
                if (updateResult.affectedRows > 0) {
                    res.send('Email successfully verified. You can now log in.');
                }
                else {
                    res.send('User not found or email verification status not updated.');
                }
            }
            catch (error) {
                console.error('Failed to update email verification status:', error);
                res.send('Failed to update email verification status.');
            }
        }
    }));
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.post('/contact', (req, res) => {
    const email = req.body.email;
    const description = req.body.description;
    // Konfigurisi transporter za slanje emaila
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'andjelkofustic99@gmail.com',
            pass: 'anbt vpil swzg nsbj'
        }, tls: {
            rejectUnauthorized: false
        }
    });
    // Postavi opcije emaila
    const mailOptions = {
        from: email,
        to: 'andjelkofustic99@gmail.com',
        subject: 'Contact',
        text: `${description}`
    };
    // Posalji email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
});
app.post('/buy', (req, res) => {
    const email = req.body.email;
    const result = req.body.result;
    const numberToMultiply = req.body.numberToMultiply;
    const cryptoa = req.body.cryptoa;
    const cardHolder = req.body.cardHolder;
    const cardNumber = req.body.cardNumber;
    // Konfigurisi transporter za slanje emaila
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'andjelkofustic99@gmail.com',
            pass: 'anbt vpil swzg nsbj'
        }, tls: {
            rejectUnauthorized: false
        }
    });
    // Postavi opcije emaila
    const mailOptions = {
        from: email,
        to: 'andjelkofustic99@gmail.com',
        subject: 'Transaction informations',
        text: `This is information about your transaction: Bitcoin: ${numberToMultiply} - EUR: ${result}, cryptoadress: ${cryptoa}
    Transaction was made by ${cardHolder} and card number ${cardNumber}`
    };
    // Posalji email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
});
//    const transporter = nodeMailer.createTransport({
//        service: 'Gmail',
//        auth: {
//            user: 'andjelkofustic99@gmail.com',
//            pass: 'zmsb ebbf rmhh llhw'
//        },
//        tls: {
//            rejectUnauthorized: false
//          }
//    });
//    const mailOptions = {
//        from: 'andjelkofustic99@gmail.com',
//        to: 'andjelkofustic99@gmail.com',
//        subject: 'Transaction informations',
//        text: 'Email send'
//    }
//    transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
//        if (error) {
//            console.log(error);
//        } else {
//            console.log('Email sent: ' + info.response);
//        }
//    })
