import useApiClient from "../../hooks/useApiClient";
export const useTicketServices = () => {
  const { request, loading, error } = useApiClient();

  const createTicket = async (ticketData) => {
   return await request({
      method: "POST",
      endpoint: "/ticket",
      body: ticketData,
      redirectTo: "/view-tickets",
    });
  };

  const viewTickets = async () => {
    const response = await request({
      method: "GET",
      endpoint: "/ticket",
      showToast: false,
    });
    return response.data;
  };

  const viewTicket = async (ticketId) => {
    const response = await request({
      method: "GET",
      endpoint: `/ticket/${ticketId}`,
    });
    return response.data;
  };
  const updateTicketStatus = async (ticketId) => {
    await request({
      method: "PATCH",
      endpoint: `/ticket/status/${ticketId}`,
      body: {},
      redirectTo: "/view-tickets",
    });
  };
  const deleteTicket = async (ticketId) => {
    await request({
      method: "DELETE",
      endpoint: `/ticket/${ticketId}`,
      redirectTo: "/view-tickets",
    });
  };

  return {
    createTicket,
    viewTickets,
    viewTicket,
    updateTicketStatus,
    deleteTicket,
    loading,
    error,
  };
};
