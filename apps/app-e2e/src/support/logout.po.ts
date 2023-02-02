export class LogoutPo {
  goTo() {
    cy.visit('/signout');
  }

  shouldHaveLogoutButton() {
    cy.get('#signout').should('exist');
  }

  clickLogoutButton() {
    cy.get('#signout').click();
  }

  shouldNotHaveLogoutButton() {
    cy.get('#signout').should('not.exist');
  }
}
