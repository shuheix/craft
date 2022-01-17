describe("記事編集機能", () => {
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

  beforeEach(() => {
    cy.get("[data-cy=menu-button]").click();
    cy.get("[data-cy=my-page]").click();
    cy.get("[data-cy=editIconButton]").first().click();
  });

  context("タイトル、投稿内容が1文字以上であれば記事編集に成功する", () => {
    it("タイトルが１文字の場合", () => {
      cy.get("[data-cy=edit-title]").clear().type("い");
      cy.get("[data-cy=edit-text]").clear().type("い");
      cy.get("[data-cy=submit]").click();
      cy.get("[data-cy=show-title]").should("contain", "い");
      cy.get("[data-cy=show-text]").should("contain", "い");
    });
  });
  context(
    "タイトルが30文字以内、テキストが1000文字以内であれば記事編集に成功する",
    () => {
      const valid_title: string = "う".repeat(30);
      const valid_text: string = "う".repeat(1000);
      it("タイトルが30文字、テキストが1000文字の場合", () => {
        cy.get("[data-cy=edit-title]").clear().type(valid_title);
        cy.get("[data-cy=edit-text]").clear().type(valid_text);
        cy.get("[data-cy=submit]").click();
        cy.get("[data-cy=show-title]").should("contain", valid_title);
        cy.get("[data-cy=show-text]").should("contain", valid_text);
      });
    }
  );
  context("タイトル又は、投稿内容が未入力の場合、記事編集に失敗する", () => {
    it("タイトルが未入力の場合", () => {
      cy.get("[data-cy=edit-title]").clear();
      cy.get("[data-cy=submit]").click();
      cy.get("[data-cy=errors-title]").contains("タイトルが未入力です");
    });
    it("投稿内容が未入力の場合", () => {
      cy.get("[data-cy=edit-text]").clear();
      cy.get("[data-cy=submit]").click();
      cy.get("[data-cy=errors-text]").contains("内容が未入力です");
    });
  });
  context(
    "タイトルが31文字以上、又は投稿内容が1000文字以上の場合、記事編集に失敗する",
    () => {
      const invalid_title: string = "え".repeat(31);
      const invalid_text: string = "え".repeat(1001);
      it("投稿内容が31文字の場合", () => {
        cy.get("[data-cy=edit-title]").clear().type(invalid_title);
        cy.get("[data-cy=submit]").click();
        cy.get("[data-cy=errors-title]").contains("タイトルは最大30文字です");
      });
      it("投稿内容が1001文字の場合", () => {
        cy.get("[data-cy=edit-text]").clear().type(invalid_text);
        cy.get("[data-cy=submit]").click();
        cy.get("[data-cy=errors-text]").contains(
          "投稿内容は、最大1000文字です"
        );
      });
    }
  );
});
