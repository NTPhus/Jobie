import { get } from "../utils/request";

export const getListCity = async () => {
    const rs = get("city");
    return rs;
}