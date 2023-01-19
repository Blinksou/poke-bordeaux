export class HomePo {
  goTo() {
    cy.visit('/');
  }

  setReturnNoActivities() {
    // cy.intercept('https://icanhazdadjoke.com/search', {
    //   fixture: 'no-joke.json',
    // });
  }

  shouldDisplayNoJokeCard() {
    cy.get('.no-joke').should('exist');
  }

  clickLoginButton() {
    cy.get('a').contains('Connexion').click();
  }

  clickSignupButton() {
    cy.get('a').contains('Inscription').click();
  }

  shouldNotHaveLoginButton() {
    cy.get('a').contains('Connexion').should('not.exist');
  }

  shouldHaveLoginButton() {
    cy.get('a').contains('Connexion').should('exist');
  }

  shouldHaveRegisterButton() {
    cy.get('a').contains('Inscription').should('exist');
  }
}
