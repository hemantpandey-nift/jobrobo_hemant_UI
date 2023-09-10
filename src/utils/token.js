const accessTokenName = "accessToken";
const refreshTokenName = "refreshToken";
const accessDataName = "accessData";

export const getAccessToken = () => {
  return localStorage.getItem(accessTokenName);
};

export const setAccessToken = (tokenValue) => {
  localStorage.setItem(accessTokenName, tokenValue);
};

export const removeAccessToken = () => {
  localStorage.removeItem(accessTokenName);
};

export const removeRefreshToken = () => {
  localStorage.removeItem(refreshTokenName);
};

export const setAccessData = (accessData) => {
  localStorage.removeItem(accessDataName);
  localStorage.setItem(accessDataName, accessData);
};

export const getAccessData = () => {
  return localStorage.getItem(accessDataName);
};
export const removeAccessData = () => {
  localStorage.removeItem(accessDataName);
};
