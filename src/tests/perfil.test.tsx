import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

// 1. MOCK DE ROUTER (Navegación)
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// 2. VARIABLES DINÁMICAS PARA CONTROLAR LOS CUSTOM HOOKS
let mockProfileData = {
  profile: { title: 'Juan Pérez', lastLoginAt: '2026-05-28', email: 'juan@test.com', dependency: 'CCM', role: 'Admin' },
  isLoading: false,
  isError: false,
};

let mockLogoutMutation = {
  mutateAsync: vi.fn(),
  isPending: false,
};

// 3. SEÑALIZACIÓN DE HOOKS ANTES DE LA CARGA DE LA PÁGINA
vi.mock('../features/profile/hooks/useProfileInfo', () => ({
  useProfileInfo: () => mockProfileData,
}));

vi.mock('../features/auth/mutations/useLogoutMutation', () => ({
  useLogoutMutation: () => mockLogoutMutation,
}));

// Mockear subcomponentes internos para aislar la vista pura
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

// Importar la página de manera segura
import PerfilPage from '../pages/perfil';

describe('Validación de Pruebas Unitarias - <PerfilPage />', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    mockLogoutMutation.mutateAsync = vi.fn().mockResolvedValue({});
    mockLogoutMutation.isPending = false;
    mockProfileData.isLoading = false;
    mockProfileData.isError = false;
  });

  test('Paso 1: Debe renderizar los encabezados y la tarjeta del perfil', () => {
    render(<PerfilPage />);
    expect(screen.getByRole('heading', { name: /Perfil/i })).toBeInTheDocument();
    expect(screen.getByText(/Consulta tu información de usuario y administra tu sesión\./i)).toBeInTheDocument();
    expect(screen.getByTestId('profile-card')).toBeInTheDocument();
  });

  test('Paso 2: Debe abrir el modal de cambio de contraseña al interactuar con la tarjeta', () => {
    render(<PerfilPage />);
    
    // El modal debe iniciar cerrado (no existir en el DOM)
    expect(screen.queryByTestId('pwd-modal')).not.toBeInTheDocument();

    // Simular el clic en el botón de edición
    fireEvent.click(screen.getByRole('button', { name: /Cambiar Contraseña/i }));

    // El estado cambia a true y el modal debe aparecer
    expect(screen.getByTestId('pwd-modal')).toBeInTheDocument();
  });

  test('Paso 3: Debe ejecutar el Cierre de Sesión de forma exitosa y redirigir al login', async () => {
    render(<PerfilPage />);

    const botonLogout = screen.getByRole('button', { name: /Cerrar sesión/i });
    fireEvent.click(botonLogout);

    // Debe llamar al mutation asíncrono
    expect(mockLogoutMutation.mutateAsync).toHaveBeenCalledTimes(1);

    // Esperar a que la promesa se resuelva y navegue correctamente
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });

  test('Paso 4: Debe capturar el error y mostrar el mensaje de alerta si falla el Logout', async () => {
    // Forzamos que la llamada al servidor falle y lance una excepción
    mockLogoutMutation.mutateAsync.mockRejectedValue(new Error('Network Crash'));

    render(<PerfilPage />);

    // El mensaje de error no debe existir inicialmente
    expect(screen.queryByText(/No se pudo cerrar la sesión\. Intenta nuevamente\./i)).not.toBeInTheDocument();

    const botonLogout = screen.getByRole('button', { name: /Cerrar sesión/i });
    fireEvent.click(botonLogout);

    // Validamos que el catch actúe e inyecte el texto en pantalla de forma segura
    await waitFor(() => {
      expect(screen.getByText(/No se pudo cerrar la sesión\. Intenta nuevamente\./i)).toBeInTheDocument();
    });
  });
});