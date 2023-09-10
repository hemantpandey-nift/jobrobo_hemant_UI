import jwt from "jwt-decode";
import { removeAccessData, removeAccessToken } from "./token";

export const getLoggedUserData = () => {
  let token = localStorage.getItem("accessToken");
  const decodeToken = token ? jwt(token) : {};
  return {
    loginId: decodeToken?.loginId ?? "",
    user_name: decodeToken?.user_name ?? "",
  };
};

export const userLogout = () => {
  removeAccessToken();
  removeAccessData();
};
