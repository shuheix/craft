describe("記事作成機能", () => {
  it("ログインに成功する", () => {
    cy.visit("/");
    cy.get("[data-cy=Login]").click();
    cy.get("[data-cy=Email]").type("cypress_test@cypress.com");
    cy.get("[data-cy=Password]").type("12345678");
    cy.get("[data-cy=ログイン]").click();
  });

  context("タイトル、投稿内容が1文字以上、であれば投稿に成功する", () => {
    it("タイトルと投稿内容が1文字の場合", () => {
      cy.get("[data-cy=post]").click();
      cy.get("[data-cy=title]").type("a");
      cy.get("[data-cy=text]").type("a");
      cy.get("[data-cy=submit]").click();
    });
    it("投稿成功後、記事詳細ページに遷移する", () => {
      cy.url().should("include", "/articles/");
    });
  });

  context(
    "タイトルが30文字以内、テキストが1000文字以内であれば投稿に成功する",
    () => {
      it("タイトルが30文字、テキストが1000文字の場合", () => {
        cy.get("[data-cy=post]").click();
        cy.get("[data-cy=title]").type("");
        cy.get("[data-cy=text]").type("");
        cy.get("[data-cy=submit]").click();
      });
      it("投稿成功後、記事詳細ページに遷移する", () => {
        cy.url().should("include", "/articles/");
      });
    }
  );

  context("タイトル又は、投稿内容が未入力の場合、記事投稿に失敗する", () => {
    it("タイトルが未入力の場合", () => {});
    it("テキストが未入力の場合", () => {});
  });

  context(
    "タイトルが31文字以上、又は投稿内容が1000文字以上の場合、記事投稿に失敗する",
    () => {
      it("タイトルが31文字の場合", () => {});
      it("投稿内容が1001文字の場合", () => {});
    }
  );

  it("ログアウトに成功する", () => {
    cy.get("[data-cy=MenuButton]").click();
    cy.get("[data-cy=Logout").click();
  });
});
