import { saveJwt, clearJwt, expiredIn } from "./tokenStorage";

// Refresh JWT token function
export const refreshToken = async () => {
  try {
    const refresh = await window.AgentAPI.Account.Refresh(3600);
    saveJwt(refresh.jwt);
    expiredIn(refresh.expires);
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

// Recover account function
export const recoverAccount = async (credentials) => {
  try {
    console.log(credentials)
    const response = await window.AgentAPI.Account.Recover(credentials.userName,credentials.personalNr,credentials.country,credentials.eMail,credentials.phoneNr);
    return response; // { success: true, message: "Recovery credentials sent." }
  } catch (error) {
    console.error("Error recovering account:", error);
    return { success: false, message: "Failed to send recovery credentials." };
  }
};
