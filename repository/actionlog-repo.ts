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

const getLogByID = async (id: number) => {
    try {
        const data = await dbConnection.query(`select * from actionlog where id = ?`,
            [id]);
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
        const result = await dbConnection.query(`insert into actionlog(vrsta, valuta, uputstvo, dobijeni_iznos, kripto_adresa, status_transakcije, created, updated) values(?,?,?,?,?,?, now(), now())`,
            [actionlog.vrsta, actionlog.valuta, actionlog.uputstvo, actionlog.dobijeni_iznos, actionlog.kripto_adresa, actionlog.status_transakcije])
        return result;
    }
    catch (e: any) {
        console.log(e);

        return { succes: false, msg: e.message }
    }
}

const updateLog = async (id: number, actionlog: any) => {
    try {
        const result = await dbConnection.query(`update actionlog set vrsta = ?, valuta = ?, uputstvo = ?, dobijeni_iznos = ?, kripto_adresa = ?, status_transakcije = ? where id = ?`,
            [actionlog.vrsta, actionlog.valuta, actionlog.uputstvo, actionlog.dobijeni_iznos, actionlog.kripto_adresa, actionlog.status_transakcije, id])
            return result;
    }
    catch (e: any) {
        return { success: false, msg: e.message }
    }
}



export default { getActionLog, insertNewLog, updateLog, getLogByID }