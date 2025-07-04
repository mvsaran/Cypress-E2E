import LoginPage from '../../Pages/LoginPage';
import ProductsPage from '../../Pages/ProductsPage';
import CheckoutPage from '../../Pages/CheckoutPage';

describe('🛒 SauceDemo E2E Purchase Flow', () => {
  const loginPage = new LoginPage();
  const productPage = new ProductsPage();
  const checkoutPage = new CheckoutPage();

  let credentials;

  before(() => {
    // Load credentials and open app
    cy.fixture('credentials').then((data) => {
      credentials = data;
    });
  });

  beforeEach(() => {
    // Always visit app before each test (if needed once, move to `before`)
    loginPage.openURL();
  });

  it('🔄 should complete an E2E purchase successfully', () => {
    // Step 1: Login
    loginPage.login(credentials.username, credentials.password);
    cy.url().should('include', '/inventory');

    // Step 2: Click product and add to cart
    productPage.clickProductName();
    productPage.clickAddToCartButton();
    productPage.addToCartFinal?.(); // optional chaining if method exists
    productPage.goToCart();

    // Step 3: Proceed to checkout
    checkoutPage.verifyInventoryItemName();
    checkoutPage.checkoutButtonClick();
    checkoutPage.enterFirstName(credentials.firstName);
    checkoutPage.enterLastName(credentials.lastName);
    checkoutPage.enterPostalCode(credentials.postalCode);
    checkoutPage.continueButtonClick();
    checkoutPage.finishButtonClick();

    // Step 4: Assert order confirmation
    checkoutPage.verifyOrderSuccess();
  });
});
