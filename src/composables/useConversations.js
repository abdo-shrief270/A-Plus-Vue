// services/conversationService.js
import { useApi } from '@/composables/useApi';

export const useConversationService = () => {
  const api = new useApi('conversation');

  const getConversations = (params = {}) => api.get(params);

  const getConversationDetails = (id, params) =>
    api.show(`details/${id}`, { params });
  const assignAgent = (payload) =>
    api.axiosInstance.post(`${api.baseUrl}/agent/assign`, payload);
  const sendMessage = (payload) =>
    api.axiosInstance.post(`${api.baseUrl}/message/send`, payload);
  const sendMessageTemplate = (payload) =>
    api.axiosInstance.post(`${api.baseUrl}/message/template/send`, payload);
  const assignTeam = (payload) =>
    api.axiosInstance.post(`${api.baseUrl}/team/assign`, payload);

  return {
    ...api, // includes loading, error, records, etc.
    getConversations,
    getConversationDetails,
    assignAgent,
    sendMessage,
    sendMessageTemplate,
    assignTeam
  };
};
