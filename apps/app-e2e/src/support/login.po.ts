export class LoginPo {
  goTo() {
    cy.visit('/login');
  }

  shouldBeDisplayed() {
    cy.get('#login-title').contains('Connexion').should('exist');
  }

  authenticate(login: string, password: string) {
    cy.get('input[id=login]').type(login);
    cy.get('input[id=password]').type(password);
    cy.get('#login-btn').click();
  }
}
