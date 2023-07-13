"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Then = exports.When = exports.Given = void 0;
_a = require('@cucumber/cucumber'), exports.Given = _a.Given, exports.When = _a.When, exports.Then = _a.Then;
const { ProductsPage } = require('../../pageObjects/productsPage');
const { Checkout } = require('../../pageObjects/checkout');
(0, exports.Given)('I am on the Products page', async function () {
    const page = this.page;
    const productPage = new ProductsPage(page);
    await productPage.visit();
});
(0, exports.When)('I add a product to the cart', async function () {
    const page = this.page;
    const productPage = new ProductsPage(page);
    await productPage.productCountAdd();
});
(0, exports.Then)('I should see the total price on the Checkout page', async function () {
    const page = this.page;
    const checkout = new Checkout(page);
    await checkout.totalPrice();
});
