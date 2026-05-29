describe("anonymous route guard", () => {
  it("redirects protected routes to login without authentication bypass", () => {
    ["/", "/comparison", "/admin", "/profile"].forEach((path) => {
      cy.visit(path);
      cy.location("pathname").should("eq", "/login");
      cy.contains("Bienvenido").should("be.visible");
    });
  });
});
