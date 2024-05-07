import Cookies from "js-cookie";
export const getAccessToken = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken;
};

export const getRefreshToken = () => {
  const refreshToken = Cookies.get("refreshToken");
  return refreshToken;
};
