describe("admin users flow", () => {
  beforeEach(() => {
    cy.mockCoreApi();
    cy.mockAdminApi();
  });

  it("filters users and confirms a deactivate action", () => {
    cy.visitAsAuthenticated("/admin", "admin");

    cy.wait("@adminUsers");
    cy.contains("Usuarios").should("be.visible");
    cy.contains("Ana López").should("be.visible");

    cy.get('input[placeholder="Buscar por nombre o correo..."]').type("Ana");
    cy.contains("Ana López").should("be.visible");

    cy.get('button[aria-label="Abrir acciones de usuario"]').click();
    cy.contains("Desactivar").click();
    cy.get('[role="dialog"]').contains("Desactivar").click();
    cy.wait("@deactivateUser");
  });
});
