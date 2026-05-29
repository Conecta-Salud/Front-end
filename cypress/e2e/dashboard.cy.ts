describe("dashboard strategic flow", () => {
  beforeEach(() => {
    cy.mockCoreApi();
    cy.mockDashboardApi();
  });

  it("loads dashboard KPIs, ranking and map with mocked production data", () => {
    cy.visitAsAuthenticated("/", "strategic");

    cy.wait("@dashboardSummary");
    cy.contains("México").should("be.visible");
    cy.contains("Promedio médicos").should("be.visible");
    cy.contains("2.5").should("be.visible");
    cy.contains("Estados").should("be.visible");
    cy.contains("Morelos").should("be.visible");
  });

  it("changes category and keeps the dashboard usable", () => {
    cy.visitAsAuthenticated("/", "strategic");

    cy.contains("Categoría").click();
    cy.contains("Infraestructura Hospitalaria").click();

    cy.contains("Indicadores de infraestructura hospitalaria").should(
      "be.visible"
    );
  });
});
