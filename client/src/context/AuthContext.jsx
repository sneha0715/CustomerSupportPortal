import { createContext, use, useContext, useEffect, useState } from "react";
import { getToken, setToken } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import useApiClient from "../hooks/useApiClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: getToken(),
    user: null,
  });

  const navigate = useNavigate();
  const token = getToken();

  const { request, data, loading, error } = useApiClient();

  useEffect(() => {
    if (!token) {
      resetAuth();
      return;
    }
    const fetchUser = async () => {
      const response = await request({
        endpoint: "/user",
      });
      
      if (response.status === 200 && response.data) {
        setAuth((prev) => ({
          ...prev,
          user: response.data,
        }));
      } else {
        resetAuth();
      }
    };
    fetchUser();
  }, [token]);

  const resetAuth = () => {
    setAuth({
      token: null,
      user: null,
    });
    setToken();
    // navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, resetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);