describe("記事作成機能", () => {
  it("記事投稿に成功する", () => {
    cy.visit("/");
    cy.get("[data-cy=Login]").click();
    cy.get("[data-cy=GuestLogin").click();

    cy.get("[data-cy=MenuButton]").click();
    cy.get("[data-cy=Logout").click();
  });
});
