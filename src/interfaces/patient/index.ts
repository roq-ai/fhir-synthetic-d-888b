import { HealthDataInterface } from 'interfaces/health-data';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PatientInterface {
  id?: string;
  first_name: string;
  last_name: string;
  date_of_birth: any;
  gender: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  health_data?: HealthDataInterface[];
  user?: UserInterface;
  _count?: {
    health_data?: number;
  };
}

export interface PatientGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  user_id?: string;
}
