import { LoginPo } from '../support/login.po';
import { LogoutPo } from '../support/logout.po';

describe('logout', () => {
  let logoutComponent: LogoutPo;
  let loginPage: LoginPo;

  beforeEach(() => {
    logoutComponent = new LogoutPo();
    loginPage = new LoginPo();

    loginPage.loginAsTestDemoUser();
  });

  it('should display logout button when user is logged in', () => {
    logoutComponent.shouldHaveLogoutButton();
    logoutComponent.clickLogoutButton();
  });

  it('should not display logout button when user is logged out', () => {
    logoutComponent.clickLogoutButton();
    logoutComponent.shouldNotHaveLogoutButton();
  });
});
