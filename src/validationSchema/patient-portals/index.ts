import * as yup from 'yup';

export const patientPortalValidationSchema = yup.object().shape({
  last_login: yup.date().required(),
  login_count: yup.number().integer().required(),
  last_activity: yup.date().required(),
  active_status: yup.boolean().required(),
  user_id: yup.string().nullable().required(),
});
