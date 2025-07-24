import { useAuth } from "../../context/AuthContext";
import { setToken } from "../../utils/localStorage";
import useApiClient from "../../hooks/useApiClient";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuthServices = (formData, redirectLocation = null) => {
  const { request, data, loading, error } = useApiClient();
  const { setAuth, resetAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const registerUser = async () => {
    const response = await request({
      method: "POST",
      endpoint: "/user/register",
      body: formData,
    });

    if (response.status === 201 && response.data.token) {
      setAuth((prev) => ({
        ...prev,
        token: response.data.token,
        user: response.data.user,
      }));
      setToken(response.data.token);

      const redirectTo = redirectLocation?.state?.from?.pathname;
      navigate(redirectTo, { replace: true });

    } else resetAuth();
  };

  const loginUser = async (formData) => {
    const response = await request({
      method: "POST",
      endpoint: "/user/login",
      body: formData,
    });
    if (response.status === 200 && response.data.token) {
      setAuth((prev) => ({
        ...prev,
        token: response.data.token,
        user: response.data.user,
      }));
      setToken(response.data.token);

      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
      
    } else resetAuth();
  };

  const logoutUser = async () => {
    const response = await request({
      endpoint: "/user/logout",
      redirectTo: "/login",
    });
    if (response.status === 200) resetAuth();
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    data,
    loading,
    error,
  };
};