import axios from 'axios';
import queryString from 'query-string';
import { AdminPortalInterface, AdminPortalGetQueryInterface } from 'interfaces/admin-portal';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAdminPortals = async (
  query?: AdminPortalGetQueryInterface,
): Promise<PaginatedInterface<AdminPortalInterface>> => {
  const response = await axios.get('/api/admin-portals', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAdminPortal = async (adminPortal: AdminPortalInterface) => {
  const response = await axios.post('/api/admin-portals', adminPortal);
  return response.data;
};

export const updateAdminPortalById = async (id: string, adminPortal: AdminPortalInterface) => {
  const response = await axios.put(`/api/admin-portals/${id}`, adminPortal);
  return response.data;
};

export const getAdminPortalById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/admin-portals/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAdminPortalById = async (id: string) => {
  const response = await axios.delete(`/api/admin-portals/${id}`);
  return response.data;
};
