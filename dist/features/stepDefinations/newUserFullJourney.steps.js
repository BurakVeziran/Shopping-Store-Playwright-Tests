"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Given, When, Then } = require('@cucumber/cucumber');
const { ProductsPage } = require('../../pageObjects/productsPage');
const { Navigation } = require('../../pageObjects/navigation');
const { Checkout } = require('../../pageObjects/checkout');
const { LoginPage } = require('../../pageObjects/loginPage');
const { RegisterPage } = require('../../pageObjects/registerPage');
const { DeliveryDetailsPage } = require('../../pageObjects/deliveryDetailsPage');
const { PaymentPage } = require('../../pageObjects/paymentPage');
const hooks_1 = require("../support/hooks");
let page;
let productPage;
let navigation;
let checkout;
let login;
let registerPage;
let deliveryDetailsPage;
let paymentPage;
Given('I visit the products page', async function () {
    productPage = new ProductsPage(page);
    await productPage.visit();
});
Given('I sort products by cheapest', async function () {
    await productPage.sortByCheapestSimpleCheck();
});
Given('I add the first three products to the basket', async function () {
    await productPage.addProductToBasket(0);
    await productPage.addProductToBasket(1);
    await productPage.addProductToBasket(2);
});
When('I go to checkout', async function () {
    navigation = new Navigation(page);
    await navigation.goToCheckout();
});
When('I remove the cheapest product', async function () {
    checkout = new Checkout();
    await checkout.removeCheapestProduct();
});
When('I continue to checkout', async function () {
    await checkout.continueToCheckout();
});
When('I move to signup', async function () {
    const loginPage = new LoginPage(page, hooks_1.fixture);
    await loginPage.moveToSignup();
});
When('I sign up as a new user', async function () {
    registerPage = new RegisterPage(page);
    await registerPage.signUpAsNewUser();
});
When('I fill and save delivery details', async function () {
    deliveryDetailsPage = new DeliveryDetailsPage(page);
    await deliveryDetailsPage.fillDetails();
    await deliveryDetailsPage.saveDetails();
    await deliveryDetailsPage.continueToPayment();
});
Then('I activate discount', async function () {
    paymentPage = new PaymentPage(page);
    await paymentPage.activateDiscount();
});
Then('I fill card detail', async function () {
    await paymentPage.fillCardDetail();
});
Then('I complete payment', async function () {
    await paymentPage.completePayment();
});
