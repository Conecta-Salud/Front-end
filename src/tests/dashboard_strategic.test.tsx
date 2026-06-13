/**
 * @vitest-environment jsdom
 */

import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardEstrategicoPage from '../pages/dashboard_strategic';

vi.mock('../config/env', () => ({
  env: { firebase: { apiKey: 'mock', authDomain: 'mock', projectId: 'mock', storageBucket: 'mock', messagingSenderId: 'mock', appId: 'mock' } },
  getRequiredEnv: (key: string) => `mock-${key}`
}));

vi.mock('../stores/headerFilterStore', () => ({
  useHeaderFilterStore: (selector: (state: any) => any) => selector({
    category: 'medical_coverage',
    year: '2026',
    selectedLocation: null,
    setSelectedLocation: vi.fn(),
  })
}));

vi.mock('../features/dashboard/hooks/useDashboardScope', () => ({
  useDashboardScope: () => ({ level: 'country' })
}));

vi.mock('../features/dashboard/hooks/useDashboardSummary', () => ({
  useDashboardSummary: () => ({
    summary: {
      kpis: [{ id: '1', title: 'Usuarios registrados', value: '151' }, { id: '2', title: 'Usuarios activos', value: '34' }],
      ranking: { title: 'Ranking' },
      mainChart: { id: 'chart1' },
      secondaryChart: { id: 'chart2' }
    },
    isLoading: false,
    isError: false,
    isFetching: false,
    isSuccess: true
  })
}));

// FORZAMOS LA DISPONIBILIDAD PARA QUE NO SALGA EL MENSAJE DE ERROR
vi.mock('../features/data-availability/queries/dataAvailability.queries', () => ({
  useDataAvailabilityQuery: () => ({
    data: { items: [{ categoryCode: 'medical_coverage', available: true }] },
    isLoading: false,
    isSuccess: true,
    isError: false
  })
}));

vi.mock('../features/data-availability/utils/dataAvailability.utils', () => ({
  isCategoryAvailable: () => true,
  getCategoryCodeFromHeaderIndicator: () => 'medical_coverage',
  getCategoryAvailabilityNote: () => ''
}));

vi.mock('../features/health-map/components/HealthMap', () => ({
  default: () => <div data-testid="health-map">Map</div>
}));

vi.mock('../features/dashboard/components/DashboardRankingSection', () => ({
  default: ({ ranking }: any) => (
    <div>
      <h3>{ranking?.title}</h3>
      <button>Ver ranking completo</button>
    </div>
  )
}));

vi.mock('../features/dashboard/components/DashboardKpiGrid', () => ({
  default: () => (
    <div>
      <div>Usuarios registrados</div>
      <div>151</div>
      <div>Usuarios activos</div>
      <div>34</div>
    </div>
  )
}));

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('<DashboardEstrategicoPage />', () => {
  test('Paso 1: Renderizado básico', async () => {
    renderWithClient(<DashboardEstrategicoPage />);
    expect(await screen.findByText(/Indicadores de cobertura médica/i)).toBeInTheDocument();
  });

  test('Paso 2: Navegación jerárquica', async () => {
    renderWithClient(<DashboardEstrategicoPage />);
    expect(await screen.findByRole('button', { name: /México/i })).toBeInTheDocument();
  });

  test('Paso 3: KPIs renderizados', async () => {
    renderWithClient(<DashboardEstrategicoPage />);
    expect(await screen.findByText('Usuarios registrados')).toBeInTheDocument();
    expect(await screen.findByText('151')).toBeInTheDocument();
  });

  test('Paso 4: Modal interactivo', async () => {
    renderWithClient(<DashboardEstrategicoPage />);
    expect(await screen.findByRole('button', { name: /Ver ranking completo/i })).toBeInTheDocument();
  });
});