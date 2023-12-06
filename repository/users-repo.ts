import dbConnection from "../common/db-connecetion";

const register = async (user: any) => {
    try {
        const result = await dbConnection.query(`insert into users(email, hashed_password, is_admin, is_verified) values(?,?,0,0)`,
            [user.email, user.hashed_password]);
        return result;
    } catch (e: any) {
        return { succes: false, msg: e.message }
    }
}

const login = async (user: any) => {
    try {
        const result = await dbConnection.query(`select * from users where email = ? and hashed_password = ?`,
            [user.email, user.hashed_password]);
        return result;
    }
    catch (e: any) {
        return { success: false, msg: e.message }
    }
}

const updateEmailVerificationStatus = async (user: any) => {
    try {
        const result = await dbConnection.query(`update users set is_verified = 1 where email = ? and is_verified = 0`,
            [user.email]);
        if (result.affectedRows > 0) {
            return { success: true, message: 'Email verified' };
        } else {
            return { success: false, message: 'User is not verified' }
        }
    } catch (e: any) {
        return { success: false, msg: e.message }
    }
};

const verStatus = async (user: any) => {
    try {
        const result = await dbConnection.query(
            `SELECT is_verified FROM users WHERE email = ?`,
            [user.email]);
        if (result.length > 0 && result[0].is_verified == 1) {
            return { success: true, message: 'Proceed to login' };
        } else {
            return { success: false, message: 'User not found' };
        }
    } catch (error) {
        console.error('Failed to check email verification status:', error);
        return { success: false, message: error };
    }
};

export default { register, login, updateEmailVerificationStatus, verStatus }