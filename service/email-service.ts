import nodeMailer from 'nodemailer';
import jwt from 'jsonwebtoken';

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

const sendVerificationEmail = async (email: string, token: string) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'andjelkofustic99@gmail.com',
            pass: 'zmsb ebbf rmhh llhw'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailConfigurations = {
        from: 'andjelkofustic99@gmail.com',
        to: email,
        subject: 'Email verification',
        text: `Verify on this link  http://localhost:3000/verify/${token}`
    };

    try {
        const info = await transporter.sendMail(mailConfigurations);
        console.log('Email Sent Successfully');
        console.log(info);
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
};




export default { sendVerificationEmail}