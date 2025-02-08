import { get } from "../utils/request";

export const getListTags = async () => {
    const rs = await get("tags");
    return rs;
}