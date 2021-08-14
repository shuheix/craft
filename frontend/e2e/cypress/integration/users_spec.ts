describe("verify userPage", () => {
  it("transition to user's article page from user's page", () => {
    cy.viewport("macbook-13");

    cy.visit("/users/5");
    cy.url().should("include", "/users");
    cy.get(".css-6xrg2u").first().click();
    cy.url().should("include", "/articles");
  });
});
