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
    cy.get('#login-link').click();
  }

  clickSignupButton() {
    cy.get('#signup-link').click();
  }

  shouldNotHaveLoginButton() {
    cy.get('#login-link').should('not.exist');
  }

  shouldHaveLoginButton() {
    cy.get('#login-link').should('exist');
  }

  shouldHaveRegisterButton() {
    cy.get('#signup-link').should('exist');
  }
}
