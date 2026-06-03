import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import LoginPage from '../pages/login';

// 1. MOCK DE REACT ROUTER
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// 2. MOCKS DE LOS COMPONENTES ADICIONALES Y ASSETS
vi.mock('../assets/backgrounds/login_shape.png', () => ({ default: 'mock-shape.png' }));
vi.mock('../assets/ConectaSalud_Full.png', () => ({ default: 'mock-logo.png' }));

// 3. MOCK DEL HOOK MUTATION DE REACT QUERY
const mockMutateAsync = vi.fn();
let mockIsPending = false;
let mockIsError = false;

vi.mock('../features/auth/mutations/useLoginMutation', () => ({
  useLoginMutation: () => ({
    mutateAsync: mockMutateAsync,
    isPending: mockIsPending,
    isError: mockIsError,
  }),
}));

describe('Pruebas Unitarias y de Interacción - <LoginPage />', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsPending = false;
    mockIsError = false;
  });

  test('Paso 1: Debe renderizar los elementos estructurales base del formulario', () => {
    render(<LoginPage />);

    // Verificar logotipo y encabezado principal
    expect(screen.getByAltText('Logo ConectaSalud')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Inicio de Sesión/i })).toBeInTheDocument();

    // Verificar presencia de inputs por sus labels
    expect(screen.getByText('Correo')).toBeInTheDocument();
    expect(screen.getByText('Contraseña')).toBeInTheDocument();

    // Verificar botón de acción y enlace de recuperación
    expect(screen.getByRole('button', { name: /Continuar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /¿Olvidaste la contraseña\?/i })).toBeInTheDocument();
  });

  test('Paso 2: Debe capturar y actualizar los valores escritos en los campos de texto', () => {
    render(<LoginPage />);

    // Conseguir los inputs basándonos en sus placeholders
    const emailInput = screen.getByPlaceholderText('correo@conectasalud.mx');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');

    // Simular que el usuario escribe credenciales
    fireEvent.change(emailInput, { target: { value: 'user@conectasalud.mx' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('user@conectasalud.mx');
    expect(passwordInput).toHaveValue('password123');
  });

  test('Paso 3: Debe ejecutar la mutación de inicio de sesión y redirigir al home al tener éxito', async () => {
    // Definimos comportamiento exitoso para la promesa
    mockMutateAsync.mockResolvedValueOnce({ success: true });

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('correo@conectasalud.mx');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
    const submitButton = screen.getByRole('button', { name: /Continuar/i });

    // Llenar datos y lanzar envío
    fireEvent.change(emailInput, { target: { value: 'user@conectasalud.mx' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Comprobar que los parámetros enviados a la mutación sean exactos
    expect(mockMutateAsync).toHaveBeenCalledWith({
      email: 'user@conectasalud.mx',
      password: 'password123',
    });

    // Esperar a que la navegación de React Router sea llamada redirigiendo a la raíz
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });
  });

  test('Paso 4: Debe mostrar un mensaje de error si las credenciales son inválidas', () => {
    // Activamos la bandera de error simulando la respuesta del hook
    mockIsError = true;

    render(<LoginPage />);

    // Comprobar que aparezca el feedback visual de alerta mapeado en tu código
    const mensajeError = screen.getByText(/Correo o contraseña incorrectos\./i);
    expect(mensajeError).toBeInTheDocument();
    expect(mensajeError).toHaveClass('text-red-500');
  });

  test('Paso 5: Debe deshabilitar el botón y cambiar su texto a "Entrando..." durante la petición', () => {
    // Activamos el estado de carga
    mockIsPending = true;

    render(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: /Entrando\.\.\./i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});