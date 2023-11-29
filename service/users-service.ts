import usersRepo from "../repository/users-repo";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const register = async (user: any) => {
    // user => username, password
    // od password-a dobijemo hashedPassword
    user.hashed_password = crypto.createHash('md5').update(user.password).digest('hex');
    const result = await usersRepo.register(user);
    if (result.affectedRows > 0) {
        // user je kreiran, kreiran token za njega i posalji ga u odgovor
        const token = jwt.sign({
            email: user.email,
            isAdmin: false
        }, 'SECRET');
        return { succes: true, token };
    } else {
        // ovo znaci nije kreiran
        return { succes: false, result }
    }
}

const login = async (user: any) => {
    user.hashed_password = crypto.createHash('md5').update(user.password).digest('hex');
    const result = await usersRepo.login(user);

    if (result && result.length > 0) {
        // ovo znaci da je ulogovan
        const token = jwt.sign({
            email: user.email,
            isAdmin: result[0].isAdmin == 1
        }, 'SECRET');
        console.log(result);
        return { succes: true, token };
    } else {
        console.log(result);
        return { succes: false, result }
    }
}



export default { register, login }

