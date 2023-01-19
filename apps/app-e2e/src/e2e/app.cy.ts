import { HomePo } from '../support/app.po';
import { LoginPo } from '../support/login.po';
import { SignupPo } from '../support/signup.po';

describe('app', () => {
  let homePage: HomePo;
  let loginPage: LoginPo;
  let signupPage: SignupPo;

  beforeEach(() => {
    homePage = new HomePo();
    loginPage = new LoginPo();
    signupPage = new SignupPo();
  });

  afterEach(() => {
    cy.logout();
  });

  it('should display login / signup buttons when not logged', () => {
    homePage.goTo();

    homePage.shouldHaveLoginButton();
    homePage.shouldHaveRegisterButton();
  });

  describe('login', () => {
    it('should display login page from home', function () {
      homePage.goTo();
      homePage.clickLoginButton();
      loginPage.shouldBeDisplayed();
    });

    it('should work with an account that exists', () => {
      loginPage.goTo();

      loginPage.authenticate('testdemo@gmail.com', 'testdemo');

      homePage.shouldNotHaveLoginButton();
    });

    it('should not work with an account that does not exist', () => {
      loginPage.goTo();

      loginPage.authenticate('blabla@gmail.com', 'blabla');

      loginPage.shouldBeDisplayed();
    });
  });

  describe('signup', () => {
    it('should display signup page from home', function () {
      homePage.goTo();
      homePage.clickSignupButton();
      signupPage.shouldBeDisplayed();
    });

    it('should work with a new account', () => {
      signupPage.goTo();

      cy.intercept('POST', '**/accounts:signUp', {
        statusCode: 200,
      });

      signupPage.signup('testdemo@gmail.com', 'testdemo');
    });

    it('should not work with an existing account', () => {
      signupPage.goTo();

      cy.intercept('POST', '**/accounts:signUp', {
        statusCode: 500,
      });

      signupPage.signup('testdemo@gmail.com', 'testdemo');

      signupPage.shouldBeDisplayed();
    });
  });

  describe('activities', () => {
    it('should display no activities', () => {
      loginPage.loginAsTestDemoUser();
      homePage.goTo();
      homePage.setReturnNoActivities();
      homePage.shouldDisplayNoActivities();
    });

    // @TODO add tests for activities
  });
});
