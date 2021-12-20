describe("記事作成機能", () => {
  context("新規記事投稿に成功する", () => {
    it("ログインに成功する", () => {
      cy.visit("/");
      cy.get("[data-cy=Login]").click();
      cy.get("[data-cy=GuestLogin").click();
    });
    it("記事投稿に成功する", () => {
      cy.get("[data-cy=post]").click();
      cy.get("[data-cy=title]").type("cypress_e2e_title");
      cy.get("[data-cy=text]").type("cypress_e2e_text");
      cy.get("[data-cy=submit]").click();
    });
    it("ログアウトに成功する", () => {
      cy.get("[data-cy=MenuButton]").click();
      cy.get("[data-cy=Logout").click();
    });
  });

  context("新規投稿した記事が存在する", () => {
    it("記事詳細ページに遷移", () => {});
  });
});
