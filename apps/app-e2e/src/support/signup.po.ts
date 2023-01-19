export class SignupPo {
  goTo() {
    cy.visit('/signup');
  }

  shouldBeDisplayed() {
    cy.get('#signup-title').contains("S'inscrire").should('exist');
  }

  signup(login: string, password: string) {
    cy.get('input[id=login]').type(login);
    cy.get('input[id=password]').type(password);
    cy.get('input[id=repeat-password]').type(password, { force: true });
    cy.get('#signup-btn').click();
  }
}
