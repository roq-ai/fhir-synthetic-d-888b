import * as yup from 'yup';

export const healthDataValidationSchema = yup.object().shape({
  height: yup.number().integer().required(),
  weight: yup.number().integer().required(),
  blood_type: yup.string().required(),
  medical_conditions: yup.string().required(),
  patient_id: yup.string().nullable().required(),
});
