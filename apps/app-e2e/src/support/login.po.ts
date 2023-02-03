export class LoginPo {
  goTo() {
    cy.visit('/login');
  }

  shouldBeDisplayed() {
    cy.get('#login-title').should('exist');
  }

  authenticate(login: string, password: string) {
    cy.get('input[id=login]').type(login);
    cy.get('input[id=password]').type(password);
    cy.get('#login-btn').click();
  }

  loginAsTestDemoUser() {
    this.goTo();
    this.authenticate('testdemo@gmail.com', 'testdemo');
    cy.get('#profile-page-link').should('exist');
  }
}
