/**
 * @vitest-environment jsdom
 */

import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import PanelAdminPage from '../pages/admin_panel';

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
// INTERCEPCIÓN DE QUERIES RAÍZ (Por si la página los usa en su top-level)
// =========================================================================
vi.mock('../features/admin/queries/adminOverview.queries', () => ({
  useAdminOverviewQuery: () => ({
    data: { totalUsers: 10, activeSessions: 3 },
    isLoading: false,
    isError: false,
  }),
}));

// =========================================================================
// MOCK DE LOS COMPONENTES DE VISTAS (FEATURES)
// Interceptamos los componentes reales identificados en la traza de error
// =========================================================================
vi.mock('../features/admin/components/AdminUsersView', () => ({
  default: () => <div data-testid="users-view">Vista de Gestión de Usuarios Activa</div>,
}));

vi.mock('../features/admin/components/AdminActivityView', () => ({
  default: () => (
    <div>
      {/* El test busca un h2 con texto exacto "Actividad" y este párrafo */}
      <h2>Actividad</h2>
      <p>Aquí conectaremos la bitácora de actividad.</p>
    </div>
  ),
}));

vi.mock('../features/admin-uploads/components/AdminUploadsPanel', () => ({
  default: () => (
    <div>
      {/* El test busca un h2 con texto exacto "Datos" y este párrafo */}
      <h2>Datos</h2>
      <p>Aquí conectaremos el estado de las fuentes de datos.</p>
    </div>
  ),
}));

// =========================================================================
// MOCK DEL COMPONENTE DE PESTAÑAS (TABS)
// =========================================================================
vi.mock('../features/admin/components/AdminViewTabs', () => ({
  default: ({ activeTab, onTabChange }: any) => (
    <nav data-testid="admin-tabs">
      <button 
        onClick={() => onTabChange('users')} 
        className={activeTab === 'users' ? 'active' : ''}
      >
        Usuarios
      </button>
      <button 
        onClick={() => onTabChange('activity')} 
        className={activeTab === 'activity' ? 'active' : ''}
      >
        Actividad
      </button>
      <button 
        onClick={() => onTabChange('data')} 
        className={activeTab === 'data' ? 'active' : ''}
      >
        Datos
      </button>
    </nav>
  ),
}));

// =========================================================================
// SUITE DE PRUEBAS UNITARIAS
// =========================================================================
describe('Pruebas Unitarias y de Control de Estado - <PanelAdminPage />', () => {

  test('Paso 1: Debe renderizar correctamente la estructura base y los encabezados', () => {
    render(<PanelAdminPage />);

    expect(screen.getByRole('heading', { name: /Panel de Administración/i })).toBeInTheDocument();
    expect(screen.getByText(/Gestiona usuarios, actividad y fuentes de datos del sistema\./i)).toBeInTheDocument();
    expect(screen.getByTestId('admin-tabs')).toBeInTheDocument();
  });

  test('Paso 2: Debe mostrar la vista de usuarios por defecto al inicializar', () => {
    render(<PanelAdminPage />);

    expect(screen.getByTestId('users-view')).toBeInTheDocument();
    expect(screen.getByText(/Vista de Gestión de Usuarios Activa/i)).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: /Actividad/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Datos/i })).not.toBeInTheDocument();
  });

  test('Paso 3: Debe cambiar dinámicamente de sección al interactuar con la pestaña de Actividad', () => {
    render(<PanelAdminPage />);

    const botonActividad = screen.getByRole('button', { name: /Actividad/i });
    fireEvent.click(botonActividad);

    expect(screen.getByRole('heading', { name: /^Actividad$/i })).toBeInTheDocument();
    expect(screen.getByText(/Aquí conectaremos la bitácora de actividad\./i)).toBeInTheDocument();
    expect(screen.queryByTestId('users-view')).not.toBeInTheDocument();
  });

  test('Paso 4: Debe cambiar dinámicamente de sección al interactuar con la pestaña de Datos', () => {
    render(<PanelAdminPage />);

    const botonDatos = screen.getByRole('button', { name: /Datos/i });
    fireEvent.click(botonDatos);

    expect(screen.getByRole('heading', { name: /^Datos$/i })).toBeInTheDocument();
    expect(screen.getByText(/Aquí conectaremos el estado de las fuentes de datos\./i)).toBeInTheDocument();
    expect(screen.queryByTestId('users-view')).not.toBeInTheDocument();
  });

});