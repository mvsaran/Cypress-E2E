class LoginPage 
{
  WebElements = {
    username: '#user-name',
    password: '#password',
    loginButton: '#login-button',
  };

  enterUsername(username) {
    cy.get(this.WebElements.username).type(username);
  }

  enterPassword(password) {
    cy.get(this.WebElements.password).type(password);
  }

  clickLoginButton() {
    cy.get(this.WebElements.loginButton).click();
  }

  login(username, password) {
    this.enterUsername(username); // use the method parameters
    this.enterPassword(password); // use the method parameters
    this.clickLoginButton();
  }
  openURL() {
    cy.visit(Cypress.env('Url'));
  }
}

// Optionally export the class if needed elsewhere
export default LoginPage;

