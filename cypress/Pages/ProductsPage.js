class ProductsPage {
  WebElements = {
    productName: '[data-test="item-4-title-link"] > [data-test="inventory-item-name"]',
    addToCartButton: '[data-test="inventory-item-name"]', // updated specific ID
    addToCartFinal: '#add-to-cart', // specific ID for the final add to cart button
  };

  clickProductName() {
    cy.get(this.WebElements.productName).click();
  }

  clickAddToCartButton() {
    cy.get(this.WebElements.addToCartButton).click();
  }
addToCartFinal() {
    cy.get(this.WebElements.addToCartFinal).click();    
  }
  goToCart() {
    cy.get('.shopping_cart_link').click();
  }
}

export default ProductsPage;
