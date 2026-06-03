import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import DashboardEstrategicoPage from '../pages/dashboard_strategic';

// 1. MOCK DEL STORE DE ZUSTAND (useHeaderFilterStore)
vi.mock('../stores/headerFilterStore', () => ({
  useHeaderFilterStore: (selector: (state: any) => any) => {
    const mockState = {
      category: 'Médicos Generales',
      year: '2026',
    };
    return selector(mockState);
  },
}));

// 2. MOCK DEL COMPONENTE DE MAPA GEOSPATIAL (HealthMap)
vi.mock('../features/health-map/components/HealthMap', () => ({
  default: () => <div data-testid="health-map">Mocked HealthMap</div>,
}));

// 3. MOCK DE COMPONENTES DE GRÁFICAS Y SUBMÓDULOS (Para evitar colisiones de dependencias visuales)
vi.mock('../components/charts/BarChart/BarChart', () => ({ default: () => <div>Mocked BarChart</div> }));
vi.mock('../components/charts/ComparisonChart/ComparisonChart', () => ({ default: () => <div>Mocked ComparisonChart</div> }));
vi.mock('../components/charts/PieChart/PieChart', () => ({ default: () => <div>Mocked PieChart</div> }));
vi.mock('../components/charts/Priority/PriorityCard', () => ({ default: () => <div>Mocked PriorityCard</div> }));
vi.mock('../components/ui/ImportButton/ImportButton', () => ({ default: () => <button>Importar</button> }));

// 4. MOCK DE COMPONENTES DE TABLAS Y TARJETAS DE RANKING
vi.mock('../components/ui/RankingTable/RankingTableCard', () => ({
  default: ({ onFooterClick, title }: any) => (
    <div>
      <h3>{title}</h3>
      <button onClick={onFooterClick}>Ver ranking completo</button>
    </div>
  ),
}));
vi.mock('../components/ui/RankingTable/RankingTableModal', () => ({
  default: ({ isOpen, onClose }: any) => isOpen ? (
    <div data-testid="ranking-modal">
      <button onClick={onClose}>Cerrar</button>
    </div>
  ) : null,
}));

describe('Pruebas Unitarias y de Navegación Estructural - <DashboardEstrategicoPage />', () => {

  test('Paso 1: Debe renderizar los encabezados principales del Dashboard Estratégico', () => {
    render(<DashboardEstrategicoPage />);

    // Validar el título de la sección simulada
    expect(screen.getByRole('heading', { name: /Dashboard Estratégico/i })).toBeInTheDocument();
    
    // Validar controles de botones principales
    expect(screen.getByRole('button', { name: /Nuevo Usuario/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Exportar/i })).toBeInTheDocument();
  });

  test('Paso 2: Debe renderizar los elementos de navegación por jerarquía del mapa', () => {
    render(<DashboardEstrategicoPage />);

    // Debe renderizar el botón raíz de México
    const botonPais = screen.getByRole('button', { name: /México/i });
    expect(botonPais).toBeInTheDocument();
    
    // Por defecto, al estar en nivel 'country', debe estar deshabilitado
    expect(botonPais).toBeDisabled();

    // Validar el texto descriptivo del año que viene de Zustand
    expect(screen.getByText(/Indicadores de cobertura médica \| 2026/i)).toBeInTheDocument();
  });

  test('Paso 3: Debe renderizar las tarjetas con los indicadores clave de rendimiento (KPIs)', () => {
    render(<DashboardEstrategicoPage />);

    // Verificar títulos de métricas mapeadas
    expect(screen.getByText(/Usuarios registrados/i)).toBeInTheDocument();
    expect(screen.getByText(/Usuarios activos/i)).toBeInTheDocument();
    expect(screen.getByText(/Comparaciones realizadas/i)).toBeInTheDocument();
    expect(screen.getByText(/Reportes exportados/i)).toBeInTheDocument();

    // Verificar valores numéricos correspondientes dentro de las tarjetas
    expect(screen.getByText('151')).toBeInTheDocument();
    expect(screen.getByText('34')).toBeInTheDocument();
  });

  test('Paso 4: Debe permitir abrir y cerrar el modal del ranking completo de unidades médicas', () => {
    render(<DashboardEstrategicoPage />);

    // El modal inicia cerrado por defecto
    expect(screen.queryByTestId('ranking-modal')).not.toBeInTheDocument();

    // Dar clic en el footer para abrir el modal completo
    const botonAbrir = screen.getByRole('button', { name: /Ver ranking completo/i });
    fireEvent.click(botonAbrir);

    // El modal debe ser inyectado en el DOM
    expect(screen.getByTestId('ranking-modal')).toBeInTheDocument();

    // Dar clic en cerrar modal
    const botonCerrar = screen.getByRole('button', { name: /Cerrar/i });
    fireEvent.click(botonCerrar);

    // El modal debe desaparecer del DOM
    expect(screen.queryByTestId('ranking-modal')).not.toBeInTheDocument();
  });
});