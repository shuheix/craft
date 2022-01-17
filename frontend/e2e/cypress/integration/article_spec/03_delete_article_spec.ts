describe("記事削除機能", () => {
  before("ログインする", () => {
    cy.visit("/");
    cy.get("[data-cy=login]").click();
    cy.get("[data-cy=email]").type("cypress_test@cypress.com");
    cy.get("[data-cy=password]").type("12345678");
    cy.get("[data-cy=ログイン]").click();
  });

  after("ログアウトに成功する", () => {
    cy.visit("/");
    cy.get("[data-cy=menu-button]").click();
    cy.get("[data-cy=logout").click();
  });

  context("自身が投稿した記事の場合、記事削除に成功する", () => {
    it("1つめの記事を削除する", () => {
      cy.get("[data-cy=menu-button]").click();
      cy.get("[data-cy=my-page]").click();
      cy.get("[data-cy=deleteIconButton]").first().click();
      cy.get("[data-cy=deleteButton]").click();
      cy.get("[id=chakra-toast-manager-bottom-right]").contains("削除しました");
    });
    it("2つめの記事を削除する", () => {
      cy.get("[data-cy=menu-button]").click();
      cy.get("[data-cy=my-page]").click();
      cy.get("[data-cy=deleteIconButton]").first().click();
      cy.get("[data-cy=deleteButton]").click();
      cy.get("[id=chakra-toast-manager-bottom-right]").contains("削除しました");
    });
  });
});
