describe("profile flow", () => {
  it("opens password modal and validates required fields", () => {
    cy.visitAsAuthenticated("/profile", "admin");

    cy.contains("Perfil").should("be.visible");
    cy.contains("admin@conectasalud.test").should("be.visible");

    cy.get('button img[alt="edit-icon"]').parent("button").click();
    cy.contains("Cambiar contraseña").should("be.visible");
    cy.contains("Guardar").click();
    cy.contains("Completa ambos campos para continuar.").should("be.visible");
  });
});
