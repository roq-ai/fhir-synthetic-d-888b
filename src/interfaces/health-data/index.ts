import { PatientInterface } from 'interfaces/patient';
import { GetQueryInterface } from 'interfaces';

export interface HealthDataInterface {
  id?: string;
  patient_id: string;
  height: number;
  weight: number;
  blood_type: string;
  medical_conditions: string;
  created_at?: any;
  updated_at?: any;

  patient?: PatientInterface;
  _count?: {};
}

export interface HealthDataGetQueryInterface extends GetQueryInterface {
  id?: string;
  patient_id?: string;
  blood_type?: string;
  medical_conditions?: string;
}
