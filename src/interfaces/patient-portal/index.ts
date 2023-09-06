import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PatientPortalInterface {
  id?: string;
  user_id: string;
  last_login: any;
  login_count: number;
  last_activity: any;
  active_status: boolean;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PatientPortalGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
