import { LoginPo } from '../support/login.po';
import { HuntPo } from '../support/hunt.po';

describe('hunt', () => {
  let huntPage: HuntPo;
  let loginPage: LoginPo;

  beforeEach(() => {
    huntPage = new HuntPo();
    loginPage = new LoginPo();

    loginPage.loginAsTestDemoUser();
  });

  afterEach(() => {
    cy.logout();
  });

  it('should display hunt page', () => {
    huntPage.goTo();
    huntPage.shouldBeDisplayed();
  });
});
