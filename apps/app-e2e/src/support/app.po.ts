export class HomePo {
  goTo() {
    cy.visit('/');
  }

  setReturnNoActivities() {
    // @TODO intercept activities firebase request to return no activities
    // cy.intercept('**/', {
    //   fixture: 'no-activities.json',
    // });
  }

  shouldDisplayNoActivities() {
    // @TODO should display no activities
    // cy.get('p').contains('Aucune activité').should('exist');
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
