import actionlogRepo from "../repository/actionlog-repo";

const getActionLog = async () => {
    const data = await actionlogRepo.getActionLog();
    return data;
}

const getLogByID = async (user_mail:string) => {
    const data = await actionlogRepo.getLogByID(user_mail);
    if (data && data.length > 0) {
        return data[0];
    }
    return null;
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