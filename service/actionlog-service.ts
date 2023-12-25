import actionlogRepo from "../repository/actionlog-repo";

const getActionLog = async () => {
    const data = await actionlogRepo.getActionLog();
    console.log(data);
    return data;
}

const getLogByID = async (user_mail: string) => {
    const data = await actionlogRepo.getLogByID(user_mail);
    // if (data && data.length > 0) {
    //     return {
    //         id: data[0].id,
    //         crypto: data[0].crypto,
    //         currency: data[0].currency,
    //         amount_due: data[0].amount_due,
    //         crypto_adress: data[0].crypto_adress,
    //         status: data[0].status,
    //         updated: data[0].updated,
    //         created: data[0].created,
    //         user_mail: data[0].user_mail
    //     };
    // }
    // return null;
    return data;
}

const insertNewLog = async (actionlog: any) => {
    const data = await actionlogRepo.insertNewLog(actionlog);
    return data;
}

const updateLog = async (id: number, actionlog: any) => {
    const data = await actionlogRepo.updateLog(id, actionlog);
    return data;
}

const deleteLog = async (id: number) => {
    const data = await actionlogRepo.deleteLog(id);
    return data;
}

export default { getActionLog, getLogByID, insertNewLog, updateLog, deleteLog }