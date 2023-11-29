import express from 'express';
import 'reflect-metadata';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Importovanje DB konekcije
import dbConnection from './common/db-connecetion';


dbConnection.initialize()
    .then(() => { console.log('Connected to DB!'); }) // potvrda da je konektovano na bazu
    .catch((err: any) => { console.log(err); }) // vraca error

app.listen(3000, () => {
    // Izvrsavanje nakon pokretanja servera
    console.log('Server is listening at port 3000;');
})

// Import ruta
import router from './routing/actionlog-routing';
app.use('/table', router);
import userRouter from './routing/users-routing';
app.use(userRouter);

// const transporter = nodeMailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'andjelkofustic99@gmail.com',
//         pass: 'zmsb ebbf rmhh llhw'
//     },
//     tls: {
//         rejectUnauthorized: false
//       }
// });

// const mailOptions = {
//     from: 'andjelkofustic99@gmail.com',
//     to: 'andjelkofustic99@gmail.com',
//     subject: 'Sendind Email using NODE.js',
//     text: 'Email send'
// }

// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);

//     }
// })