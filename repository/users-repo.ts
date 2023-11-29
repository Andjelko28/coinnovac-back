import dbConnection from "../common/db-connecetion";

const register = async (user: any) => {
    try {
        const result = await dbConnection.query(`insert into users(email, hashed_password, is_admin) values(?,?,0)`,
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

export default { register, login }