import useApiClient from "../../hooks/useApiClient";
export const useNoteServices = () => {
  const { request, loading, error } = useApiClient();

  const createNote = async (formData, ticketId) => {
    await request({
      method: "POST",
      endpoint: `/note/${ticketId}`,
      body: formData,
    });
  };

  const viewNote = async (ticketId) => {
    const response = await request({
      endpoint: `/note/${ticketId}`,
    });
    return response.data;
  };

  return {
    createNote,
    viewNote,
    loading,
    error,
  };
};