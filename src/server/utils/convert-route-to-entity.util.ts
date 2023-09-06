const mapping: Record<string, string> = {
  'admin-portals': 'admin_portal',
  'health-data': 'health_data',
  patients: 'patient',
  'patient-portals': 'patient_portal',
  providers: 'provider',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
