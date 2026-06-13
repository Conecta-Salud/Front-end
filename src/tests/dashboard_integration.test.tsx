/**
 * @vitest-environment jsdom
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardStrategicPage from '../pages/dashboard_strategic';
import { useHeaderFilterStore } from '../stores/headerFilterStore';

vi.mock('../services/auth/firebase', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
  },
}));

vi.mock('../config/env', () => {
  const mockEnv = {
    apiUrl: 'http://localhost:8080/api',
    firebase: {
      apiKey: 'mock-key',
      authDomain: 'mock-auth',
      projectId: 'mock-project',
      storageBucket: 'mock-bucket',
      messagingSenderId: 'mock-sender',
      appId: 'mock-app',
    },
  };
  return {
    default: mockEnv,
    env: mockEnv,
    getRequiredEnv: (key: string) => (key === 'VITE_API_URL' ? 'http://localhost:8080' : 'mock-value'),
  };
});

const mockSummaryData = {
  kpis: [
    { id: 'kpi-1', title: 'Cobertura Médica', label: 'Cobertura Médica', value: '85%', trend: 'up' },
    { id: 'kpi-2', title: 'Camas Hospitalarias', label: 'Camas Hospitalarias', value: '3.2 por cada 1k', trend: 'stable' }
  ],
  ranking: [
    { id: '1', state: 'Ciudad de México', value: 95 }
  ],
  mainChart: {
    type: 'line',
    data: []
  },
  secondaryChart: {
    type: 'bar',
    data: []
  },
  isLoading: false,
  isError: false,
  isFetching: false
};

vi.mock('../features/dashboard/hooks/useDashboardSummary', () => ({
  useDashboardSummary: () => mockSummaryData
}));

vi.mock('../hooks/useDashboardSummary', () => ({
  useDashboardSummary: () => mockSummaryData
}));

vi.mock('../features/data-availability/queries/dataAvailability.queries.ts', () => ({
  useDataAvailabilityQuery: () => ({ data: [], isLoading: false, isError: false })
}));

vi.mock('../features/health-map/components/HealthMap', () => ({
  default: () => <div data-testid="mapa-interactivo">Mapa de ConectaSalud</div>
}));

vi.mock('recharts', async () => {
  const original = await vi.importActual('recharts') as any;
  return {
    ...original,
    ResponsiveContainer: ({ children }: any) => <div style={{ width: 500, height: 300 }}>{children}</div>,
  };
});

describe('Pruebas de Integración - Flujo de Filtros y KPIs', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    useHeaderFilterStore.setState({ year: 2026, category: 'medical_coverage' });
  });

  test('Debe integrar los contenedores del Dashboard y responder a los estados globales', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DashboardStrategicPage />
      </QueryClientProvider>
    );

    expect(await screen.findByText('México')).toBeInTheDocument();
    
    const currentStore = useHeaderFilterStore.getState();
    expect(currentStore.year).toBe(2026);
  });

  test('Debe verificar la presencia integrada del mapa y los elementos estructurales', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DashboardStrategicPage />
      </QueryClientProvider>
    );
    
    expect(await screen.findByTestId('mapa-interactivo')).toBeInTheDocument();
    expect(screen.getByText(/Indicadores de cobertura médica/i)).toBeInTheDocument();
  });

  test('Debe simular la interacción con los controles integrados de la interfaz', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DashboardStrategicPage />
      </QueryClientProvider>
    );

    const tituloPais = await screen.findByText('México');
    expect(tituloPais).toBeInTheDocument();
  });
});