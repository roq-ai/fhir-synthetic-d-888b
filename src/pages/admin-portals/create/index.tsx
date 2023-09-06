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

import { createAdminPortal } from 'apiSdk/admin-portals';
import { adminPortalValidationSchema } from 'validationSchema/admin-portals';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { AdminPortalInterface } from 'interfaces/admin-portal';

function AdminPortalCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AdminPortalInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAdminPortal(values);
      resetForm();
      router.push('/admin-portals');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AdminPortalInterface>({
    initialValues: {
      last_login: new Date(new Date().toDateString()),
      login_count: 0,
      last_activity: new Date(new Date().toDateString()),
      active_status: false,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: adminPortalValidationSchema,
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
              label: 'Admin Portals',
              link: '/admin-portals',
            },
            {
              label: 'Create Admin Portal',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Admin Portal
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="last_login" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Login
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_login ? new Date(formik.values?.last_login) : null}
              onChange={(value: Date) => formik.setFieldValue('last_login', value)}
            />
          </FormControl>

          <NumberInput
            label="Login Count"
            formControlProps={{
              id: 'login_count',
              isInvalid: !!formik.errors?.login_count,
            }}
            name="login_count"
            error={formik.errors?.login_count}
            value={formik.values?.login_count}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('login_count', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="last_activity" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Activity
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_activity ? new Date(formik.values?.last_activity) : null}
              onChange={(value: Date) => formik.setFieldValue('last_activity', value)}
            />
          </FormControl>

          <FormControl
            id="active_status"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.active_status}
          >
            <FormLabel htmlFor="switch-active_status">Active Status</FormLabel>
            <Switch
              id="switch-active_status"
              name="active_status"
              onChange={formik.handleChange}
              value={formik.values?.active_status ? 1 : 0}
            />
            {formik.errors?.active_status && <FormErrorMessage>{formik.errors?.active_status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
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
              onClick={() => router.push('/admin-portals')}
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
    entity: 'admin_portal',
    operation: AccessOperationEnum.CREATE,
  }),
)(AdminPortalCreatePage);
