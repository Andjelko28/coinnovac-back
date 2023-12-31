import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import nodeMailer from 'nodemailer';
import bodyParser from 'body-parser';

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
import adminRouting from './routing/admin-routing'
app.use(adminRouting)

app.get('/verify/:token', async (req, res) => {
  const { token } = req.params;

  jwt.verify(token, 'SECRET', async (err, decoded: any) => {
    if (err) {
      console.log(err);
      res.send('Verification failed');
    } else {
      const userEmail = decoded.email;

      try {
        // Odmah azuriraj status verifikacije u bazi podataka
        const updateResult = await dbConnection.query(
          'UPDATE users SET is_verified = 1 WHERE email = ? and is_verified = 0',
          [userEmail]
        );

        if (updateResult.affectedRows > 0) {
          res.send('Email successfully verified. You can now log in.');
        } else {
          res.send('User not found or email verification status not updated.');
        }
      } catch (error) {
        console.error('Failed to update email verification status:', error);
        res.send('Failed to update email verification status.');
      }
    }
  });
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
  const email = req.body.email;
  const description = req.body.description;

  // Konfigurisi transporter za slanje emaila
  const transporter = nodeMailer.createTransport({
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
  transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
    if (error) {
      console.log(error);
    } else {
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
  const transporter = nodeMailer.createTransport({
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
  transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
    if (error) {
      console.log(error);
    } else {
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
