import usersRepo from "../repository/users-repo";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import emailService from "./email-service";
import actionlogRepo from "../repository/actionlog-repo";

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

const register = async (user: any) => {
    // Kreiranje hashed_password
    user.hashed_password = crypto.createHash('md5').update(user.password).digest('hex');

    // Registrovanje korisnika
    const result = await usersRepo.register(user);

    if (result.affectedRows > 0) {
        // Kreiranje tokena za korisnika
        const token = jwt.sign({
            email: user.email,
            isAdmin: false
        }, 'SECRET');
        try {
            await emailService.sendVerificationEmail(user.email, token)
            return { success: true, token };
        } catch (e) {
            console.error('Failed to send email', e)
            return { success: false, result }
        } finally {
            return { success: true, token };
        }
    } else {
        // Ako nije uspelo kreiranje korisnika
        return { success: false, message: 'Failed to create user' }
    }
}

const login = async (user: any) => {
    user.hashed_password = crypto.createHash('md5').update(user.password).digest('hex');
    const result = await usersRepo.login(user);

    if (result && result.length > 0) {
        const userFromDb = result[0];

        if (userFromDb.is_verified === 1) {
            // ovo znaci da je ulogovan
            const token = jwt.sign({
                email: user.email,
                isAdmin: result[0].is_admin == 1 ? true : false,
            }, 'SECRET');
            console.log(result);
            return { succes: true, token, message: 'User is verified' };
        } else {
            console.log(result);
            return { succes: false, result, message: 'User is not verified' }
        }
    } else {
        console.log(result);
        return { succes: false, result, message: 'User is not verified' }
    }
}




export default { register, login }

