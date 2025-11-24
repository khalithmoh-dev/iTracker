import apiClient from './client';
import { Investment } from '../types/investment';

export const loadInvestments = async (): Promise<Investment[]> => {
  const response = await apiClient.get('/investments');
  return response.data;
};

export const addInvestment = async (investment: Investment): Promise<Investment> => {
  const response = await apiClient.post('/investments', investment);
  return response.data;
};

export const updateInvestment = async (id: string, updates: Partial<Investment>): Promise<Investment> => {
  const response = await apiClient.put(`/investments/${id}`, updates);
  return response.data;
};

export const deleteInvestment = async (id: string): Promise<void> => {
  await apiClient.delete(`/investments/${id}`);
};

export const saveInvestments = async (investments: Investment[]): Promise<void> => {
  await apiClient.post('/investments/bulk', investments);
};

