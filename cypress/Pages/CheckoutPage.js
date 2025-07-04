class CheckoutPage {
  WebElements = {
    cartBox: '.shopping_cart_link',
    inventoryItemName: '.inventory_item_name',
    checkoutButton: '#checkout',
    firstName: '#first-name',
    lastName: '#last-name',
    postalCode: '#postal-code',
    continueButton: '#continue',
    finishButton: '#finish',
    checkoutComplete: '.complete-header',
    confirmationMessage: '.complete-text',
  };

  cartBoxClick() {
    cy.get(this.WebElements.cartBox).click();
  }

  verifyInventoryItemName() {
    cy.get(this.WebElements.inventoryItemName).should('contain.text', 'Sauce Labs Backpack');
  }

  checkoutButtonClick() {
    cy.get(this.WebElements.checkoutButton).click();
  }

  enterFirstName(firstName) {
    cy.get(this.WebElements.firstName).type(firstName);
  }

  enterLastName(lastName) {
    cy.get(this.WebElements.lastName).type(lastName);
  }

  enterPostalCode(postalCode) {
    cy.get(this.WebElements.postalCode).type(postalCode);
  }

  continueButtonClick() {
    cy.get(this.WebElements.continueButton).click();
  }

  finishButtonClick() {
    cy.get(this.WebElements.finishButton).click();
  }

  verifyOrderSuccess() {
    cy.get(this.WebElements.checkoutComplete).should('contain.text', 'Thank you for your order!');
  }
}

export default CheckoutPage;
