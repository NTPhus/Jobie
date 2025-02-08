import { del, edit, get, post } from "../utils/request";

export const getListJobs = async () => {
    const rs = await get("jobs");
    return rs;
}

export const getDataJob = async (id) => {
    const rs = await get("jobs/"+id);
    return rs;
}

export const getListJobByIdCompany = async (id) => {
    const rs = await get("jobs?idCompany="+id);
    return rs;
}

export const createNewJob = async (options) => {
    const rs = await post("jobs", options);
    return rs;
}

export const deleteJob = async (id) => {
    const rs = await del("jobs/", id)
    return rs;
}

export const updateJob = async (options) => {
    const rs = await edit("jobs/", options);
    return rs;
}