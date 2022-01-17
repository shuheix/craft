describe("記事作成機能", () => {
  before("ログインする", () => {
    cy.visit("/");
    cy.get("[data-cy=Login]").click();
    cy.get("[data-cy=Email]").type("cypress_test@cypress.com");
    cy.get("[data-cy=Password]").type("12345678");
    cy.get("[data-cy=ログイン]").click();
  });

  after("ログアウトに成功する", () => {
    cy.visit("/");
    cy.get("[data-cy=MenuButton]").click();
    cy.get("[data-cy=Logout").click();
  });

  context("タイトル、投稿内容が1文字以上であれば投稿に成功する", () => {
    it("タイトルと投稿内容が1文字の場合", () => {
      cy.get("[data-cy=post]").click();
      cy.url().should("include", "/articles/new");
      cy.get("[data-cy=title]").type("あ");
      cy.get("[data-cy=text]").type("あ");
      cy.get("[data-cy=submit]").click();
      cy.get("[data-cy=show-title]").should("contain", "あ");
      cy.get("[data-cy=show-text]").should("contain", "あ");
    });
  });

  context(
    "タイトルが30文字以内、テキストが1000文字以内であれば投稿に成功する",
    () => {
      const valid_title: string = "あ".repeat(30);
      const valid_text: string = "あ".repeat(1000);
      it("タイトルが30文字、テキストが1000文字の場合", () => {
        cy.get("[data-cy=post]").click();
        cy.get("[data-cy=title]").clear().type(valid_title);
        cy.get("[data-cy=text]").clear().type(valid_text);
        cy.get("[data-cy=submit]").click();
        cy.get("[data-cy=show-title]").should("contain", valid_title);
        cy.get("[data-cy=show-text]").should("contain", valid_text);
      });
    }
  );

  context("タイトル又は、投稿内容が未入力の場合、記事投稿に失敗する", () => {
    beforeEach("", () => {
      cy.visit("/");
    });
    it("タイトルが未入力の場合", () => {
      cy.get("[data-cy=post]").click();
      cy.get("[data-cy=text]").type("a");
      cy.get("[data-cy=submit]").click();
      cy.get("[data-cy=errors-title]").contains("タイトルが未入力です");
    });
    it("投稿内容が未入力の場合", () => {
      cy.get("[data-cy=post]").click();
      cy.get("[data-cy=title]").type("a");
      cy.get("[data-cy=submit]").click();
      cy.get("[data-cy=errors-text]").contains("内容が未入力です");
    });
  });

  context(
    "タイトルが31文字以上、又は投稿内容が1000文字以上の場合、記事投稿に失敗する",
    () => {
      beforeEach("", () => {
        cy.visit("/");
      });
      const valid_title: string = "あ".repeat(31);
      const valid_text: string = "あ".repeat(1001);

      it("タイトルが31文字の場合", () => {
        cy.get("[data-cy=post]").click();
        cy.get("[data-cy=title]").type(valid_title);
        cy.get("[data-cy=text]").type("a");
        cy.get("[data-cy=submit]").click();
        cy.get("[data-cy=errors-title]").contains("タイトルは最大30文字です");
      });
      it("投稿内容が1001文字の場合", () => {
        cy.get("[data-cy=post]").click();
        cy.get("[data-cy=title]").type("a");
        cy.get("[data-cy=text]").type(valid_text);
        cy.get("[data-cy=submit]").click();
        cy.get("[data-cy=errors-text]").contains(
          "投稿内容は、最大1000文字です"
        );
      });
    }
  );
});

describe("記事削除機能", () => {
  before("ログインする", () => {
    cy.visit("/");
    cy.get("[data-cy=Login]").click();
    cy.get("[data-cy=Email]").type("cypress_test@cypress.com");
    cy.get("[data-cy=Password]").type("12345678");
    cy.get("[data-cy=ログイン]").click();
  });

  after("ログアウトに成功する", () => {
    cy.visit("/");
    cy.get("[data-cy=MenuButton]").click();
    cy.get("[data-cy=Logout]").click();
  });

  it("自身が投稿した記事の場合、記事削除に成功する", () => {
    cy.get("[data-cy=MenuButton]").click();
    cy.get("[data-cy=MyPage]").click();
    cy.get("[data-cy=deleteIconButton]").first().click();
    cy.get("[data-cy=deleteButton]").click();
    cy.get("[id=chakra-toast-manager-bottom-right]").contains("削除しました");
    cy.get("[data-cy=deleteIconButton]").first().click();
    cy.get("[data-cy=deleteButton]").click();
    cy.get("[id=chakra-toast-manager-bottom-right]").contains("削除しました");
  });
});
