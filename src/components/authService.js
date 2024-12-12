import { saveJwt, clearJwt, expiredIn } from "./tokenStorage";

// Refresh JWT token function
export const refreshToken = async () => {
  try {
    var refresh = await window.AgentAPI.Account.Refresh(3600); 
    saveJwt(refresh.jwt);
    expiredIn(refresh.expires)
  } catch (error) {
    console.error("Error refreshing token:", error);
    clearJwt();
    return null;
  }
};

// Token validity check
export const isTokenValid = (jwt) => {
  if (!jwt) return false;
  const payload = JSON.parse(atob(jwt.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp > currentTime;
};