import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createHealthData } from 'apiSdk/health-data';
import { healthDataValidationSchema } from 'validationSchema/health-data';
import { PatientInterface } from 'interfaces/patient';
import { getPatients } from 'apiSdk/patients';
import { HealthDataInterface } from 'interfaces/health-data';

function HealthDataCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: HealthDataInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createHealthData(values);
      resetForm();
      router.push('/health-data');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<HealthDataInterface>({
    initialValues: {
      height: 0,
      weight: 0,
      blood_type: '',
      medical_conditions: '',
      patient_id: (router.query.patient_id as string) ?? null,
    },
    validationSchema: healthDataValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Health Data',
              link: '/health-data',
            },
            {
              label: 'Create Health Data',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Health Data
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Height"
            formControlProps={{
              id: 'height',
              isInvalid: !!formik.errors?.height,
            }}
            name="height"
            error={formik.errors?.height}
            value={formik.values?.height}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('height', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Weight"
            formControlProps={{
              id: 'weight',
              isInvalid: !!formik.errors?.weight,
            }}
            name="weight"
            error={formik.errors?.weight}
            value={formik.values?.weight}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('weight', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.blood_type}
            label={'Blood Type'}
            props={{
              name: 'blood_type',
              placeholder: 'Blood Type',
              value: formik.values?.blood_type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.medical_conditions}
            label={'Medical Conditions'}
            props={{
              name: 'medical_conditions',
              placeholder: 'Medical Conditions',
              value: formik.values?.medical_conditions,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<PatientInterface>
            formik={formik}
            name={'patient_id'}
            label={'Select Patient'}
            placeholder={'Select Patient'}
            fetcher={getPatients}
            labelField={'first_name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/health-data')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'health_data',
    operation: AccessOperationEnum.CREATE,
  }),
)(HealthDataCreatePage);
