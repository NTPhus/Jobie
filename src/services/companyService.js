import { edit, get, post } from "../utils/request";

export const getListCompany = async () => {
  const rs = await get("companys");
  return rs;
};

export const getDataCompany = async (id) => {
  const rs = await get("companys/" + id);
  return rs;
};

export const checkExist = async (name, value) => {
  const rs = await get("companys?" + name + "=" + value);
  return rs;
};

export const createNewCompany = async (options) => {
    const rs = await post("companys", options);
    return rs;
};

export const updateInfoCompany = async (options) => {
  const rs = await edit("companys/", options);
  return rs;
};

export const login = async (email, password) => {
  const em = "email="+email;
  const pw = "password="+password;
  const rs = await get("companys?" + em + "&" + pw);
  return rs;
};