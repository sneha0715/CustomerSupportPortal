import axiosInstance from "../services/axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../services/Toast";

const useApiClient = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async ({
      method = "GET",
      endpoint,
      body = null,
      redirectTo = "",
      showToast = true,
    }) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance({
          method,
          url: endpoint,
          data: body,
        });

        // console.log("API response:", response);

        if (showToast && response.data?.message)
          successToast(response.data.message);

        if (redirectTo) navigate(redirectTo);

        return response;
      } catch (error) {
        console.error("API request error:", error);

        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.errors[0]?.msg ||
          "An error occurred while processing your request.";

        setError(errorMessage);

        if (showToast) errorToast(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    request,
  };
};

export default useApiClient;
