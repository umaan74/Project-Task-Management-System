
import {
  createContext,
  useState,
  useEffect,
} from "react";

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getCurrentUser,
} from "../services/authService.js";

let refreshInFlight;

function refreshSession() {
  if (!refreshInFlight) {
    refreshInFlight = refreshToken().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [AccessToken, setAccessToken] = useState(null);
  const [CurrentUser, setCurrentUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  async function Register(username, email, password) {
    const { response, data } = await registerUser(username, email, password);
    if (!response.ok) {
      return {
        ok: false,
        message: data.message || "Unable to register.",
      };
    }

    setAuthError("");
    setCurrentUser(null);
    setAccessToken(data.AccessToken);
    return { ok: true };
  }

  // LOGIN
  async function Login(username, password) {
    const { response, data } = await loginUser(username, password);

    if (!response.ok) {
      return {
        ok: false,
        message: data.message || "Unable to login.",
      };
    }

    setAuthError("");
    setCurrentUser(null);
    setAccessToken(data.AccessToken);
    return { ok: true };
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
          if (response.status === 401) {
            const refreshed = await refreshSession();
            if (refreshed.response.ok) {
              setAccessToken(refreshed.data.NewAccessToken);
              return;
            }
            setAuthError(
              refreshed.data.message || data.message || "Your session has expired. Please login again."
            );
            setAccessToken(null);
          } else {
            setAuthError(data.message || "Unable to verify your session.");
          }
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Current user loading failed:", error);

        if (isMounted) {
          setAuthError(error.message || "Unable to verify your session.");
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

  // Refresh the short-lived access token before it expires.
  useEffect(() => {
    if (!AccessToken) return undefined;

    let delay = 14 * 60 * 1000;
    try {
      const payload = JSON.parse(
        atob(AccessToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
      );
      if (payload.exp) {
        delay = Math.max(payload.exp * 1000 - Date.now() - 60 * 1000, 1000);
      }
    } catch (error) {
      console.error("Unable to read access token expiry:", error);
    }

    const timeout = setTimeout(async () => {
      try {
        const { response, data } = await refreshSession();
        if (!response.ok) {
          setAuthError(data.message || "Your session has expired. Please login again.");
          setAccessToken(null);
          setCurrentUser(null);
          return;
        }
        setAuthError("");
        setAccessToken(data.NewAccessToken);
      } catch (error) {
        console.error("Access token refresh failed:", error);
        setAuthError(error.message || "Unable to refresh your session.");
        setAccessToken(null);
        setCurrentUser(null);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [AccessToken]);

  // CHECK EXISTING LOGIN SESSION
  useEffect(() => {
    async function CheckLogin() {
      try {
        const { response, data } = await refreshSession();

        if (response.ok) {
          setAccessToken(data.NewAccessToken);
        } else if (
          response.status === 401 &&
          data.message !== "Refresh token missing"
        ) {
          setAuthError(data.message || "Your session has expired. Please login again.");
        } else if (response.status >= 500) {
          setAuthError(data.message || "Unable to restore your session.");
        }
      } catch (error) {
        console.error("Session restoration failed:", error);
        setAuthError(error.message || "Unable to restore your session.");
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
        authError,
        Register,
        Login,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
