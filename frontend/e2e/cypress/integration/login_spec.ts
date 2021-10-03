describe("verify login function", () => {
  it("should be success when a user input correct params", () => {
    cy.viewport("macbook-13");

    cy.visit("/articles");
    cy.url().should("include", "/articles");
    cy.contains("Login").click();
    cy.get('input[name="email"]').first().type("test100@test.com");
    cy.get('input[name="password"]').first().type("12345678");
    cy.contains("ログイン").click();
  });
});
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
