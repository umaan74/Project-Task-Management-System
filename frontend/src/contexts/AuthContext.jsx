
import {
  createContext,
  useState,
  useEffect,
} from "react";

import {
  loginUser,
  logoutUser,
  refreshToken,
  getCurrentUser,
} from "../services/authService.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [AccessToken, setAccessToken] = useState(null);
  const [CurrentUser, setCurrentUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(false);

  // LOGIN
  async function Login(username, password) {
    const { response, data } = await loginUser(username, password);

    if (response.ok) {
      setCurrentUser(null);
      setAccessToken(data.AccessToken);
      return true;
    }

    return false;
  }

  // LOGOUT
  async function Logout() {
    try {
      await logoutUser();
    } finally {
      setAccessToken(null);
      setCurrentUser(null);
    }
  }

  // GET CURRENT USER
  useEffect(() => {
    let isMounted = true;

    async function LoadCurrentUser() {
      if (!AccessToken) {
        setCurrentUser(null);
        return;
      }

      setIsUserLoading(true);

      try {
        const { response, data } = await getCurrentUser(AccessToken);

        if (isMounted && response.ok) {
          setCurrentUser(data.user);
        } else if (isMounted) {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Current user loading failed:", error);

        if (isMounted) {
          setCurrentUser(null);
        }
      } finally {
        if (isMounted) {
          setIsUserLoading(false);
        }
      }
    }

    LoadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, [AccessToken]);

  // CHECK EXISTING LOGIN SESSION
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
        CurrentUser,
        isLoading,
        isUserLoading,
        Login,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
