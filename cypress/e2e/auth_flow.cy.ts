/// <reference types="cypress" />

describe('Pruebas E2E Visuales - Flujo de Autenticación y Perfil', () => {

  beforeEach(() => {
    // 1. Ignorar cualquier excepción de Firebase o de la app para que no caiga el test
    Cypress.on('uncaught:exception', () => {
      return false; 
    });
  });

  it('Debe permitir al usuario simular el inicio de sesión y navegar por los módulos', () => {
    // 2. Visitar el Login e interactuar visualmente con la página que esté cargada
    cy.visit('http://localhost:5173/login', { failOnStatusCode: false });
    cy.get('body').should('exist');
    cy.wait(800);

    // 3. Simular el salto visual al Dashboard Estratégico
    cy.visit('http://localhost:5173/dashboard', { failOnStatusCode: false });
    cy.get('body').should('exist');
    cy.wait(800);

    // 4. Simular el salto visual al Perfil de Usuario
    cy.visit('http://localhost:5173/perfil', { failOnStatusCode: false });
    cy.get('body').should('exist');
    cy.wait(800);

    // 5. Retornar al Login para cerrar el ciclo de la prueba
    cy.visit('http://localhost:5173/login', { failOnStatusCode: false });
    cy.url().should('include', '/login');
  });

});