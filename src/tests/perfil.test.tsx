/**
 * @vitest-environment jsdom
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import React from 'react';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const state = {
  profileData: {
    profile: { title: 'Juan Pérez', lastLoginAt: '2026-05-28', email: 'juan@test.com', dependency: 'CCM', role: 'Admin' },
    isLoading: false,
    isError: false,
  },
  logoutMutation: {
    mutateAsync: vi.fn(),
    isPending: false,
  }
};

vi.mock('../features/profile/hooks/useProfileInfo', () => ({
  useProfileInfo: () => state.profileData,
}));

vi.mock('../features/auth/mutations/useLogoutMutation', () => ({
  useLogoutMutation: () => state.logoutMutation,
}));

vi.mock('../features/profile/components/ProfileInfoCard', () => ({
  default: ({ title, onEditPassword }: any) => (
    <div data-testid="profile-card">
      <span>{title}</span>
      <button onClick={onEditPassword}>Cambiar Contraseña</button>
    </div>
  ),
}));

vi.mock('../features/profile/components/ChangePasswordModal', () => ({
  default: ({ isOpen }: any) => isOpen ? <div data-testid="pwd-modal">Modal Abierto</div> : null,
}));

import PerfilPage from '../pages/perfil';

describe('Validación de Pruebas Unitarias - <PerfilPage />', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    state.logoutMutation.mutateAsync = vi.fn().mockResolvedValue({});
    state.logoutMutation.isPending = false;
    state.profileData.isLoading = false;
    state.profileData.isError = false;
  });

  test('Paso 1: Debe renderizar los encabezados y la tarjeta del perfil', () => {
    render(<PerfilPage />);
    expect(screen.getByRole('heading', { name: /Perfil/i })).toBeInTheDocument();
    expect(screen.getByText(/Consulta tu información de usuario y administra tu sesión\./i)).toBeInTheDocument();
    expect(screen.getByTestId('profile-card')).toBeInTheDocument();
  });

  test('Paso 2: Debe abrir el modal de cambio de contraseña al interactuar con la tarjeta', () => {
    render(<PerfilPage />);
    
    expect(screen.queryByTestId('pwd-modal')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Cambiar Contraseña/i }));

    expect(screen.getByTestId('pwd-modal')).toBeInTheDocument();
  });

  test('Paso 3: Debe ejecutar el Cierre de Sesión de forma exitosa y redirigir al login', async () => {
    render(<PerfilPage />);

    // 1. Abrir el modal usando el botón externo
    const botonTrigger = screen.getByRole('button', { name: /Cerrar sesión/i });
    fireEvent.click(botonTrigger);

    // 2. Aislar la búsqueda dentro del componente <dialog>
    const dialog = screen.getByRole('dialog');
    const botonConfirmar = within(dialog).getByRole('button', { name: /^Cerrar sesión$/i });
    fireEvent.click(botonConfirmar);

    expect(state.logoutMutation.mutateAsync).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });

  test('Paso 4: Debe capturar el error y mostrar el mensaje de alerta si falla el Logout', async () => {
    state.logoutMutation.mutateAsync.mockRejectedValue(new Error('Network Crash'));

    render(<PerfilPage />);

    expect(screen.queryByText(/No se pudo cerrar la sesión\. Intenta nuevamente\./i)).not.toBeInTheDocument();

    // 1. Abrir el modal usando el botón externo
    const botonTrigger = screen.getByRole('button', { name: /Cerrar sesión/i });
    fireEvent.click(botonTrigger);

    // 2. Aislar la búsqueda dentro del diálogo para presionar el botón de confirmación erróneo
    const dialog = screen.getByRole('dialog');
    const botonConfirmar = within(dialog).getByRole('button', { name: /^Cerrar sesión$/i });
    fireEvent.click(botonConfirmar);

    await waitFor(() => {
      expect(screen.getByText(/No se pudo cerrar la sesión\. Intenta nuevamente\./i)).toBeInTheDocument();
    });
  });
});