import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import PanelAdminPage from '../pages/admin_panel';

// 1. MOCK DE LOS COMPONENTES DE CARACTERÍSTICAS (FEATURES)
vi.mock('../features/admin/components/AdminUsersView', () => ({
  default: () => <div data-testid="users-view">Vista de Gestión de Usuarios Activa</div>,
}));

// 2. MOCK DEL COMPONENTE DE PESTAÑAS (TABS)
// Simulamos el comportamiento para poder interactuar con los botones de pestañas en el test
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

describe('Pruebas Unitarias y de Control de Estado - <PanelAdminPage />', () => {

  test('Paso 1: Debe renderizar correctamente la estructura base y los encabezados', () => {
    render(<PanelAdminPage />);

    // Verificar títulos principales mapeados en tu interfaz
    expect(screen.getByRole('heading', { name: /Panel de Administración/i })).toBeInTheDocument();
    expect(screen.getByText(/Gestiona usuarios, actividad y fuentes de datos del sistema\./i)).toBeInTheDocument();
    
    // Verificar que el contenedor de las pestañas esté presente
    expect(screen.getByTestId('admin-tabs')).toBeInTheDocument();
  });

  test('Paso 2: Debe mostrar la vista de usuarios por defecto al inicializar', () => {
    render(<PanelAdminPage />);

    // Por defecto el estado inicia en "users"
    expect(screen.getByTestId('users-view')).toBeInTheDocument();
    expect(screen.getByText(/Vista de Gestión de Usuarios Activa/i)).toBeInTheDocument();

    // Las otras secciones no deben existir en el DOM aún
    expect(screen.queryByRole('heading', { name: /Actividad/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Datos/i })).not.toBeInTheDocument();
  });

  test('Paso 3: Debe cambiar dinámicamente de sección al interactuar con la pestaña de Actividad', () => {
    render(<PanelAdminPage />);

    // Localizar y dar clic al botón de Actividad simulado
    const botonActividad = screen.getByRole('button', { name: /Actividad/i });
    fireEvent.click(botonActividad);

    // Debe inyectar la sección de actividad
    expect(screen.getByRole('heading', { name: /^Actividad$/i })).toBeInTheDocument();
    expect(screen.getByText(/Aquí conectaremos la bitácora de actividad\./i)).toBeInTheDocument();

    // La vista de usuarios debe haber sido removida del DOM
    expect(screen.queryByTestId('users-view')).not.toBeInTheDocument();
  });

  test('Paso 4: Debe cambiar dinámicamente de sección al interactuar con la pestaña de Datos', () => {
    render(<PanelAdminPage />);

    // Localizar y dar clic al botón de Datos simulado
    const botonDatos = screen.getByRole('button', { name: /Datos/i });
    fireEvent.click(botonDatos);

    // Debe inyectar la sección de datos
    expect(screen.getByRole('heading', { name: /^Datos$/i })).toBeInTheDocument();
    expect(screen.getByText(/Aquí conectaremos el estado de las fuentes de datos\./i)).toBeInTheDocument();

    // La vista de usuarios no debe estar activa
    expect(screen.queryByTestId('users-view')).not.toBeInTheDocument();
  });

});