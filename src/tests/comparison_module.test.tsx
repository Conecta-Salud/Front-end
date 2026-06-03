import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// ==========================================
// 1. CONFIGURACIÓN DE MOCKS
// ==========================================

vi.mock('../stores/headerFilterStore', () => ({
  useHeaderFilterStore: (selector: (state: any) => any) => {
    return selector({ year: '2026' });
  },
}));

vi.mock('../features/catalogs/queries/catalog.queries', () => ({
  usePeriodsCatalogQuery: () => ({
    data: [{ id: 'period-123', year: '2026' }],
    isLoading: false,
  }),
  useStatesCatalogQuery: () => ({
    data: [{ code: '01', name: 'Aguascalientes' }, { code: '02', name: 'Baja California' }],
    isLoading: false,
  }),
  useMunicipalitiesCatalogQuery: () => ({
    data: [{ code: '01001', name: 'Aguascalientes Mnpio', stateCode: '01' }],
    isLoading: false,
  }),
}));

// Mantendremos variables dinámicas para interceptar y simular los estados internos
let mockSummaryData = {
  charts: [],
  priority: [],
  isLoading: false,
  isError: false,
};

vi.mock('../features/comparison/hooks/useComparisonSummary', () => ({
  useComparisonSummary: () => mockSummaryData,
}));

// MOCK CLAVE: Forzamos a ComparisonSelector a simular que el usuario ya seleccionó dos opciones válidas
vi.mock('../features/comparison/components/ComparisonSelector', () => ({
  default: ({ error, onFirstLocationChange, onSecondLocationChange }: any) => {
    // Usamos un useEffect simulado o disparadores automáticos para que se ejecuten al renderizar
    React.useEffect(() => {
      if (mockSummaryData.isLoading || mockSummaryData.isError || mockSummaryData.charts.length > 0) {
        onFirstLocationChange({ code: '01', name: 'Aguascalientes' });
        onSecondLocationChange({ code: '02', name: 'Baja California' });
      }
    }, []);

    return (
      <div data-testid="comparison-selector">
        {error && <span data-testid="selection-error">{error}</span>}
      </div>
    );
  },
}));

vi.mock('../features/comparison/components/ComparisonChartGrid', () => ({
  default: ({ isLoading }: any) => (
    <div data-testid="chart-grid">{isLoading ? 'Cargando Gráficas...' : 'Gráficas Comparativas'}</div>
  ),
}));

vi.mock('../features/comparison/components/PriorityIndexCards', () => ({
  default: ({ isLoading }: any) => (
    <div data-testid="priority-cards">{isLoading ? 'Cargando Prioridades...' : 'Tarjetas de Prioridad'}</div>
  ),
}));

import ModuloComparacionPage from '../pages/comparison_module';

// ==========================================
// 2. SUITE DE PRUEBAS UNITARIAS
// ==========================================
describe('Pruebas Unitarias de Lógica y Estados - <ModuloComparacionPage />', () => {

  beforeEach(() => {
    mockSummaryData = {
      charts: [],
      priority: [],
      isLoading: false,
      isError: false,
    };
  });

  test('Paso 1: Debe renderizar los encabezados básicos del módulo y el año del filtro', () => {
    render(<ModuloComparacionPage />);

    expect(screen.getByRole('heading', { name: /Módulo de Comparación/i })).toBeInTheDocument();
    expect(screen.getByText(/Elige dos estados o municipios del mismo nivel territorial para comparar \| 2026/i)).toBeInTheDocument();
    expect(screen.getByTestId('comparison-selector')).toBeInTheDocument();
  });

  test('Paso 2: Debe mostrar el estado vacío (pendiente) por defecto cuando no hay selección', () => {
    render(<ModuloComparacionPage />);

    expect(screen.getByRole('heading', { name: /Comparación pendiente/i })).toBeInTheDocument();
    expect(screen.getByText(/Selecciona dos territorios del mismo nivel para visualizar gráficas e índice de prioridad\./i)).toBeInTheDocument();
  });

  test('Paso 3: Debe mostrar el estado de carga (Loading State) si se están consultando los datos del sumario', () => {
    // Activamos la bandera de carga antes del renderizado
    mockSummaryData.isLoading = true;

    render(<ModuloComparacionPage />);
    
    // Al simular la selección de localidades, hasCompleteSelection se vuelve true, habilitando el bloque de carga
    expect(screen.getByTestId('chart-grid')).toBeInTheDocument();
    expect(screen.getByText('Cargando Gráficas...')).toBeInTheDocument();
    expect(screen.getByText('Cargando Prioridades...')).toBeInTheDocument();
  });

  test('Paso 4: Debe renderizar el estado de error si el hook de comparación reporta una falla', () => {
    // Activamos la bandera de error simulando falla del servidor
    mockSummaryData.isError = true;
    mockSummaryData.isLoading = false;

    render(<ModuloComparacionPage />);
    
    // Validamos que se inyecte la alerta de error controlada
    expect(screen.getByRole('heading', { name: /No se pudo cargar la comparación/i })).toBeInTheDocument();
    expect(screen.getByText(/Intenta cambiar los territorios seleccionados o verifica que existan datos para el año seleccionado\./i)).toBeInTheDocument();
  });
});