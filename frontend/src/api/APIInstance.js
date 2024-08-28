// apiUtils.js
import axios from 'axios';

import { API_BASE_URL } from './endpoint'; // Thay đổi URL cơ sở của API của bạn

// Tạo đối tượng axios với cấu hình cơ sở
const apiClient = axios.create({
  baseURL: API_BASE_URL || 'http://localhost:5001/api',
  // baseURL:  'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Phương thức chung để gọi API
export const apiRequest = async (method, endpoint, token, body = null, params = null) => {
  try {
    const response = await apiClient.request({
      url: endpoint,
      method,
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined, // Thêm token vào header nếu có
      },
      data: body,
      params: params,
    });

    return response.data;
  } catch (error) {
    console.error('Error making API request:', error);
    throw error; 
  }
};

export const get = (endpoint, token, params) => apiRequest('GET', endpoint, token, null, params);
export const post = (endpoint, body, token) => apiRequest('POST', endpoint, token, body);
export const put = (endpoint, body, token) => apiRequest('PUT', endpoint, token, body);
export const patch = (endpoint, body, token) => apiRequest('PATCH', endpoint, token, body);
export const del = (endpoint, token) => apiRequest('DELETE', endpoint, token);
