import actionlogRepo from "../repository/actionlog-repo";

const getActionLog = async () => {
    const data = await actionlogRepo.getActionLog();
    return data;
}

const getLogByID = async (id: number) => {
    const data = await actionlogRepo.getLogByID(id);
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


export default { getActionLog, getLogByID, insertNewLog, updateLog }