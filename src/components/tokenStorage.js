export const saveJwt = (jwt) => {
  localStorage.setItem("jwt", jwt);
};

export const getJwt = () => {
  return localStorage.getItem("jwt");
};

export const clearJwt = () => {
  localStorage.removeItem("jwt");
};

export const expiredIn = (expired) => {
  localStorage.setItem("expired", expired)
};