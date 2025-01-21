import Cookies from "js-cookie";

export const setToken = (token) => {
  Cookies.set("authToken", token, { expires: 7 });
//   Cookies.set("role", role, { expires: 7 }); // Simpan role
};

export const removeToken = () => {
  Cookies.remove("authToken");
//   Cookies.remove("role"); // Hapus role
};

export const getToken = () => {
  return Cookies.get("authToken");
};

export const isAuthenticated = () => {
  return !!getToken();
};
