/**
 * @vitest-environment jsdom
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

// =========================================================================
// MOCK DE VARIABLES DE ENTORNO
// =========================================================================
vi.mock('../config/env', () => ({
  env: {
    firebase: {
      apiKey: 'mock-api-key',
      authDomain: 'mock-auth-domain',
      projectId: 'mock-project-id',
      storageBucket: 'mock-storage-bucket',
      messagingSenderId: 'mock-sender-id',
      appId: 'mock-app-id'
    }
  },
  getRequiredEnv: (key: string) => `mock-${key}`
}));

// =========================================================================
// CONFIGURACIÓN DEL ROUTER
// =========================================================================
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// =========================================================================
// ESTADO GLOBAL DE CONTROL MUTABLE PARA DATOS DE CONSULTA
// =========================================================================
const integrationState = {
  year: '2024',
  summaryData: {
    charts: [] as any[],
    priority: [] as any[],
    isLoading: false,
    isError: false,
  }
};

// =========================================================================
// MOCKS DE STORES, CATÁLOGOS Y DISPONIBILIDAD DE DATOS
// =========================================================================
vi.mock('../stores/headerFilterStore', () => ({
  useHeaderFilterStore: (selector: (state: any) => any) => {
    return selector({ year: integrationState.year });
  },
}));

vi.mock('../features/catalogs/queries/catalog.queries', () => ({
  usePeriodsCatalogQuery: () => ({
    data: [{ id: 'period-2024', year: '2024' }],
    isLoading: false,
    isFetching: false,
  }),
}));

vi.mock('../features/data-availability/queries/dataAvailability.queries', () => ({
  useDataAvailabilityQuery: () => ({
    data: { items: [{ isAvailable: true, category: 'sectorial' }] },
    isLoading: false,
    isFetching: false,
  })
}));

vi.mock('../features/comparison/utils/comparisonAvailability.utils', () => ({
  COMPARISON_SECTORIAL_CATEGORY_CODE: 'SEC',
  COMPARISON_SECTORIAL_UNAVAILABLE_MESSAGE: 'No hay datos sectoriales disponibles para el año seleccionado. Selecciona un año con datos de salud sectorial, como 2018, 2020, 2022 o 2024.',
  getComparisonTerritoryLevel: (lvl: string) => lvl,
  getComparisonAvailabilityState: () => ({ isAvailable: true, hasSectoralData: true })
}));

vi.mock('../features/comparison/utils/comparisonChart.adapter', () => ({
  hasUnavailableComparisonCharts: () => false
}));

// =========================================================================
// HOOK DE LA CONSULTA DE COMPARACIÓN DE CONECTASALUD
// =========================================================================
vi.mock('../features/comparison/hooks/useComparisonSummary', () => ({
  useComparisonSummary: () => {
    return integrationState.summaryData;
  },
}));

// =========================================================================
// MODALIDAD INTERACTIVA DEL SELECTOR MOCK (Sincronizado con useState local)
// =========================================================================
vi.mock('../features/comparison/components/ComparisonSelector', () => ({
  default: ({ error, onFirstLocationChange, onSecondLocationChange }: any) => {
    return (
      <div data-testid="comparison-selector">
        {error && <span data-testid="selection-error">{error}</span>}
        
        <button 
          data-testid="select-territorio-1" 
          onClick={() => onFirstLocationChange({ code: '01', name: 'Aguascalientes' })}
        >
          Select 1
        </button>
        
        <button 
          data-testid="select-territorio-2" 
          onClick={() => onSecondLocationChange({ code: '02', name: 'Baja California' })}
        >
          Select 2
        </button>

        <button 
          data-testid="clear-selectors"
          onClick={() => {
            onFirstLocationChange(null);
            onSecondLocationChange(null);
          }}
        >
          Clear
        </button>
      </div>
    );
  },
}));

// Eliminamos el comportamiento lazy inyectando directamente elementos planos en el test
vi.mock('../features/comparison/components/ComparisonChartGrid', () => ({
  default: ({ isLoading, charts }: any) => (
    <div data-testid="chart-grid">
      {isLoading ? 'Cargando Gráficas...' : `Gráficas Comparativas: ${charts?.length || 0} renderizadas`}
    </div>
  ),
}));

vi.mock('../features/comparison/components/PriorityIndexCards', () => ({
  default: ({ isLoading }: any) => (
    <div data-testid="priority-cards">
      {isLoading ? 'Cargando Prioridades...' : 'Tarjetas de Prioridad'}
    </div>
  ),
}));

import ModuloComparacionPage from '../pages/comparison_module';

// =========================================================================
// SUITE DE PRUEBAS INTEGRALES DE FLUJO DE COMUNICACIÓN
// =========================================================================
describe('Pruebas Integrales de Comunicación - <ModuloComparacionPage />', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    integrationState.year = '2024';
    integrationState.summaryData = {
      charts: [],
      priority: [],
      isLoading: false,
      isError: false,
    };
  });

  test('Paso 1: Debe renderizar la estructura inicial del módulo acoplada al año global', () => {
    render(<ModuloComparacionPage />);

    expect(screen.getByRole('heading', { name: /Módulo de Comparación/i })).toBeInTheDocument();
    expect(screen.getByText(/Elige dos estados o municipios del mismo nivel territorial para comparar \| 2024/i)).toBeInTheDocument();
    expect(screen.getByTestId('comparison-selector')).toBeInTheDocument();
  });

  test('Paso 2: Debe mantener el estado pendiente hasta que el usuario complete la selección dual', async () => {
    render(<ModuloComparacionPage />);

    expect(screen.getByRole('heading', { name: /Comparación pendiente/i })).toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('select-territorio-1'));
    
    expect(screen.getByRole('heading', { name: /Comparación pendiente/i })).toBeInTheDocument();
    expect(screen.getByText(/Selecciona un segundo territorio para comparar\./i)).toBeInTheDocument();
  });

  test('Paso 3: Debe activar la carga integrada de datos cuando se completa el flujo de selección', async () => {
    integrationState.summaryData = {
      charts: [],
      priority: [],
      isLoading: true,
      isError: false
    };

    render(<ModuloComparacionPage />);
    
    fireEvent.click(screen.getByTestId('select-territorio-1'));
    fireEvent.click(screen.getByTestId('select-territorio-2'));

    await waitFor(() => {
      expect(screen.getByTestId('chart-grid')).toBeInTheDocument();
      expect(screen.getByText('Cargando Gráficas...')).toBeInTheDocument();
    });
  });

  test('Paso 4: Debe renderizar las gráficas e índices integrados al resolver la consulta de ConectaSalud con éxito', async () => {
    integrationState.summaryData = {
      charts: [{ id: 'chart-1' }, { id: 'chart-2' }],
      priority: [{ id: 'priority-1' }],
      isLoading: false,
      isError: false
    };

    render(<ModuloComparacionPage />);

    fireEvent.click(screen.getByTestId('select-territorio-1'));
    fireEvent.click(screen.getByTestId('select-territorio-2'));

    await waitFor(() => {
      expect(screen.getByTestId('chart-grid')).toBeInTheDocument();
      expect(screen.getByText('Gráficas Comparativas: 2 renderizadas')).toBeInTheDocument();
      expect(screen.getByTestId('priority-cards')).toBeInTheDocument();
    });
  });

  test('Paso 5: Debe propagar de forma segura el estado de error si el servidor falla', async () => {
    integrationState.summaryData = {
      charts: [],
      priority: [],
      isLoading: false,
      isError: true
    };

    render(<ModuloComparacionPage />);
    
    fireEvent.click(screen.getByTestId('select-territorio-1'));
    fireEvent.click(screen.getByTestId('select-territorio-2'));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /No se pudo cargar la comparación/i })).toBeInTheDocument();
      expect(screen.getByText(/No se pudo cargar la comparación\. Intenta nuevamente\./i)).toBeInTheDocument();
    });
  });

  test('Paso 6: Debe regresar al estado pendiente y limpiar todo cuando el usuario presiona Clear', async () => {
    integrationState.summaryData = {
      charts: [{ id: 'chart-1' }],
      priority: [{ id: 'priority-1' }],
      isLoading: false,
      isError: false
    };

    render(<ModuloComparacionPage />);

    fireEvent.click(screen.getByTestId('select-territorio-1'));
    fireEvent.click(screen.getByTestId('select-territorio-2'));

    expect(screen.getByText('Gráficas Comparativas: 1 renderizadas')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('clear-selectors'));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Comparación pendiente/i })).toBeInTheDocument();
      expect(screen.getByText(/Selecciona dos territorios para iniciar la comparación\./i)).toBeInTheDocument();
      expect(screen.queryByText('Gráficas Comparativas: 1 renderizadas')).not.toBeInTheDocument();
    });
  });

  test('Paso 7: Debe mostrar el mensaje de advertencia si la consulta tiene éxito pero los datos son parciales', async () => {
    const adapter = await import('../features/comparison/utils/comparisonChart.adapter');
    vi.spyOn(adapter, 'hasUnavailableComparisonCharts').mockReturnValue(true);

    integrationState.summaryData = {
      charts: [{ id: 'chart-1' }],
      priority: [],
      isLoading: false,
      isError: false
    };

    render(<ModuloComparacionPage />);

    fireEvent.click(screen.getByTestId('select-territorio-1'));
    fireEvent.click(screen.getByTestId('select-territorio-2'));

    await waitFor(() => {
      expect(screen.getByText(/Algunos indicadores no están disponibles para el nivel territorial seleccionado\./i)).toBeInTheDocument();
    });

    vi.restoreAllMocks();
  });

  test('Paso 8: Debe mostrar el mensaje de restricción si no hay datos sectoriales disponibles para el año', async () => {
    const availabilityUtils = await import('../features/comparison/utils/comparisonAvailability.utils');
    vi.spyOn(availabilityUtils, 'getComparisonAvailabilityState').mockReturnValue({
      isAvailable: false,
      hasSectoralData: false
    } as any);

    render(<ModuloComparacionPage />);

    fireEvent.click(screen.getByTestId('select-territorio-1'));
    fireEvent.click(screen.getByTestId('select-territorio-2'));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Comparación pendiente/i })).toBeInTheDocument();
      expect(screen.getByText(/No hay datos sectoriales disponibles para el año seleccionado/i)).toBeInTheDocument();
    });

    vi.restoreAllMocks();
  });
});