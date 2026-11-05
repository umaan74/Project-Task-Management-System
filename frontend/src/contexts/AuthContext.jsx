
import { createContext, useState, useEffect } from "react";
import { loginUser, logoutUser, refreshToken } from "../services/authService.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [AccessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function Login(username, password) {
    const { response, data } = await loginUser(username, password);

    if (response.ok) {
      setAccessToken(data.AccessToken);
      return true;
    }

    return false;
  }

  async function Logout() {
    await logoutUser();
    setAccessToken(null);
  }

  useEffect(() => {
    async function CheckLogin() {
      try {
        const { response, data } = await refreshToken();

        if (response.ok) {
          setAccessToken(data.NewAccessToken);
        }
      } catch (error) {
        console.log("Session not found");
      } finally {
        setIsLoading(false);
      }
    }

    CheckLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        AccessToken,
        Login,
        Logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
