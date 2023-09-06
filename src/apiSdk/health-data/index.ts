import axios from 'axios';
import queryString from 'query-string';
import { HealthDataInterface, HealthDataGetQueryInterface } from 'interfaces/health-data';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getHealthData = async (
  query?: HealthDataGetQueryInterface,
): Promise<PaginatedInterface<HealthDataInterface>> => {
  const response = await axios.get('/api/health-data', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createHealthData = async (healthData: HealthDataInterface) => {
  const response = await axios.post('/api/health-data', healthData);
  return response.data;
};

export const updateHealthDataById = async (id: string, healthData: HealthDataInterface) => {
  const response = await axios.put(`/api/health-data/${id}`, healthData);
  return response.data;
};

export const getHealthDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/health-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHealthDataById = async (id: string) => {
  const response = await axios.delete(`/api/health-data/${id}`);
  return response.data;
};
