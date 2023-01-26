export class HuntPo {
  goTo() {
    cy.visit('/hunt');
  }

  shouldBeDisplayed() {
    cy.get('#hunt-title').should('exist');
  }
}
