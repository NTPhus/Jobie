import { del, edit, get, post} from "../utils/request";

export const createCV = async (options) => {
    const result = await post("cv", options);
    return result;
}

export const getCVById = async (id) => {
    const rs = await get("cv/"+ id);
    return rs;
}

export const getCVByIdCompany = async (id) => {
    const rs = await get("cv?idCompany="+id);
    return rs;
}

export const deleteCVById = async (id) => {
    const rs = await del("cv/",id);
    return rs;
}

export const updateStatusCV = async (id) => {
    const cv = await get("cv/"+ id);
    console.log(cv);
    cv.status = true;
    const rs = await edit("cv/", cv);
    return rs;
}