describe("comparison flow", () => {
  beforeEach(() => {
    cy.mockCoreApi();
    cy.mockComparisonApi();
  });

  it("compares two states and renders charts plus priority index", () => {
    cy.visitAsAuthenticated("/comparison", "strategic");

    cy.get('input[placeholder="Selecciona un estado..."]').type("Morelos");
    cy.contains("Morelos").click();

    cy.get('input[placeholder="Selecciona otro estado..."]').type("Jalisco");
    cy.contains("Jalisco").click();

    cy.wait("@comparisonSummary");
    cy.contains("Cobertura médica").should("be.visible");
    cy.contains("Índice de prioridad").should("be.visible");
    cy.contains("Alta").should("be.visible");
  });

  it("switches to municipality comparison", () => {
    cy.visitAsAuthenticated("/comparison", "strategic");

    cy.contains("Estados").click();
    cy.contains("Comparar municipios").click();
    cy.get('input[placeholder="Selecciona un municipio..."]').should(
      "be.visible"
    );
  });
});
