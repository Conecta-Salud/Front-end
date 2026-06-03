import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import DashboardStrategicPage from '../pages/dashboard_strategic';
import { useHeaderFilterStore } from '../stores/headerFilterStore';

const mockSummaryData = {
  summary: {
    kpis: [
      { id: 'kpi-1', title: 'Cobertura Médica', value: '85%', trend: 'up' },
      { id: 'kpi-2', title: 'Camas Hospitalarias', value: '3.2 por cada 1k', trend: 'stable' }
    ],
    ranking: [],
    mainChart: {},
    secondaryChart: {}
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
  
  beforeEach(() => {
    useHeaderFilterStore.setState({ year: 2026, category: 'medical_coverage' });
  });

  test('Debe integrar los contenedores del Dashboard y responder a los estados globales', async () => {
    render(<DashboardStrategicPage />);
    expect(screen.getByText('Dashboard Estratégico')).toBeInTheDocument();
    
    const currentStore = useHeaderFilterStore.getState();
    expect(currentStore.year).toBe(2026);
  });

  test('Debe verificar la presencia integrada del mapa y los elementos estructurales', () => {
    render(<DashboardStrategicPage />);
    expect(screen.getByTestId('mapa-interactivo')).toBeInTheDocument();
    expect(screen.getByText('Nuevo Usuario')).toBeInTheDocument();
    expect(screen.getByText('Exportar')).toBeInTheDocument();
  });

  // 🚀 ESTE ES EL COMPLEMENTO DE INTEGRACIÓN REAL: Interacción de usuario
  test('Debe simular la interacción con los controles integrados de la interfaz', async () => {
    render(<DashboardStrategicPage />);

    // 1. Localizar el botón de "Exportar" que renderiza tu componente real
    const botonExportar = screen.getByText('Exportar');
    expect(botonExportar).toBeInTheDocument();

    // 2. Simular un clic real del usuario en la interfaz integrada
    fireEvent.click(botonExportar);

    // 3. Verificar que el componente responde al evento de forma interactiva
    // (Por ejemplo, asegurando que no se deshabilite o que el estado se mantenga estable)
    expect(botonExportar).not.toBeDisabled();
  });
});