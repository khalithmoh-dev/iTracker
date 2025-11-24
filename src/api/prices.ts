import apiClient from './client';

interface PriceData {
  price: number;
  currency: string;
}

export const getCryptoPrice = async (symbol: string): Promise<PriceData | null> => {
  try {
    const response = await apiClient.get(`/prices/crypto/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto price:', error);
    return null;
  }
};

export const getStockPrice = async (symbol: string): Promise<PriceData | null> => {
  try {
    const response = await apiClient.get(`/prices/stock/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return null;
  }
};

export const getGoldPrice = async (): Promise<PriceData | null> => {
  try {
    const response = await apiClient.get('/prices/gold');
    return response.data;
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return null;
  }
};

