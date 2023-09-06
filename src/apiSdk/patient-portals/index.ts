import axios from 'axios';
import queryString from 'query-string';
import { PatientPortalInterface, PatientPortalGetQueryInterface } from 'interfaces/patient-portal';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPatientPortals = async (
  query?: PatientPortalGetQueryInterface,
): Promise<PaginatedInterface<PatientPortalInterface>> => {
  const response = await axios.get('/api/patient-portals', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPatientPortal = async (patientPortal: PatientPortalInterface) => {
  const response = await axios.post('/api/patient-portals', patientPortal);
  return response.data;
};

export const updatePatientPortalById = async (id: string, patientPortal: PatientPortalInterface) => {
  const response = await axios.put(`/api/patient-portals/${id}`, patientPortal);
  return response.data;
};

export const getPatientPortalById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/patient-portals/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePatientPortalById = async (id: string) => {
  const response = await axios.delete(`/api/patient-portals/${id}`);
  return response.data;
};
