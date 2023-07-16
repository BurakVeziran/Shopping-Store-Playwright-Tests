export const { Given, When, Then } = require('@cucumber/cucumber');
const { ProductsPage } = require('../../pageObjects/productsPage');
const { Checkout } = require('../../pageObjects/checkout');

Given('I am on the Products page', async function () {
    const page = this.page;
    const productPage = new ProductsPage(page);
    await productPage.visit();
});

When('I add a product to the cart', async function () {
    const page = this.page;
    const productPage = new ProductsPage(page);
    await productPage.productCountAdd();
});

Then('I should see the total price on the Checkout page', async function () {
    const page = this.page;
    const checkout = new Checkout(page);
    await checkout.totalPrice();
});
