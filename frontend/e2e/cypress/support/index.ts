import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<Element>;
    }
    interface Chainable {
      login(): void;
    }
  }
}

Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.get("[data-cy=Login]").click();
  cy.get("[data-cy=GuestLogin").click();
});

Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});
