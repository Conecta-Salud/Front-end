/// <reference types="cypress" />

describe('Pruebas E2E: Flujo de Navegación del Usuario', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  it('Debe navegar correctamente por los módulos tras iniciar sesión', () => {
    cy.login('gael@gmail.com', 'Contra123');

    cy.visit('/dashboard');
    cy.get('h1').should('contain', 'México');

    cy.visit('/perfil');
    cy.get('body').should('be.visible');
  });
});