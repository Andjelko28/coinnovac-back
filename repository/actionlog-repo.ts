import dbConnection from "../common/db-connecetion";

const getActionLog = async () => {
    try {
        const data = await dbConnection.query('select * from actionlog'); // Vraca cijelu tabelu action log
        return data;
    }
    catch (e) {
        return e;
    }
}

const getLogByID = async (user_mail: string) => {
    try {
        const data = await dbConnection.query(`select * from actionlog where user_mail = ?`, [user_mail]);
        console.log(data);
        return data;
    }
    catch (e) {
        console.log(e);

        return null;
    }
}

const insertNewLog = async (actionlog: any) => {
    try {
        const result = await dbConnection.query(`insert into actionlog(crypto, currency, amount_due, crypto_adress, status,user_mail, created, updated) values(?,?,?,?,?,?, now(), now())`,
            [actionlog.crypto, actionlog.currency, actionlog.amount_due, actionlog.crypto_adress, actionlog.status, actionlog.user_mail])
        return result;
    }
    catch (e: any) {
        console.log(e);

        return { succes: false, msg: e.message }
    }
}

const updateLog = async (id: number, actionlog: any) => {
    try {
        const result = await dbConnection.query(`update actionlog set crypto = ?, currency = ?, amount_due = ?, crypto_adress = ?, status = ? where id = ?`,
            [actionlog.crypto, actionlog.currency, actionlog.amount_due, actionlog.crypto_adress, actionlog.status, id])
        return result;
    }
    catch (e: any) {
        return { success: false, msg: e.message }
    }
}

const deleteLog = async (id: number) => {
    try {
        const result = await dbConnection.query(`delete from actionlog where id = ?`, [id])
        return { succes: true }
    } catch (e: any) {
        return { succes: false, msg: e.message }
    }
}


export default { getActionLog, insertNewLog, updateLog, getLogByID, deleteLog }