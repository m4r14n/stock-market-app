import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const getStockRecommendation = async (startTime, endTime, maxFunds) => {
  try {
    const response = await axiosInstance.get('/stock-recommendation', {
      params: { start_time: startTime, end_time: endTime, max_funds: maxFunds },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStockData = async () => {
  try {
    const response = await axiosInstance.get('/stock-data');
    return response;
  } catch (error) {
    throw error;
  }
};
