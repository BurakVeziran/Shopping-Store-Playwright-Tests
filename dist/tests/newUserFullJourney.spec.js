"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const productsPage_1 = require("../pageObjects/productsPage");
const navigation_1 = require("../pageObjects/navigation");
const checkout_1 = require("../pageObjects/checkout");
const loginPage_1 = require("../pageObjects/loginPage");
const registerPage_1 = require("../pageObjects/registerPage");
const deliveryDetailsPage_1 = require("../pageObjects/deliveryDetailsPage");
const paymentPage_1 = require("../pageObjects/paymentPage");
const hooks_1 = require("../features/support/hooks");
(0, test_1.test)("new User full end-to-end journey", async ({ page }) => {
    const productPage = new productsPage_1.ProductsPage(page);
    await productPage.visit();
    await productPage.sortByCheapestSimpleCheck();
    await productPage.addProductToBasket(0);
    await productPage.addProductToBasket(1);
    await productPage.addProductToBasket(2);
    const navigation = new navigation_1.Navigation(page);
    await navigation.goToCheckout();
    const checkout = new checkout_1.Checkout();
    await checkout.removeCheapestProduct();
    await checkout.continueToCheckout();
    const login = new loginPage_1.LoginPage(page, hooks_1.fixture);
    await login.moveToSignup();
    const registerPage = new registerPage_1.RegisterPage(page);
    await registerPage.signUpAsNewUser();
    const deliveryDetailsPage = new deliveryDetailsPage_1.DeliveryDetailsPage(page);
    await deliveryDetailsPage.fillDetails();
    await deliveryDetailsPage.saveDetails();
    await deliveryDetailsPage.continueToPayment();
    const paymentPage = new paymentPage_1.PaymentPage(page);
    await paymentPage.activateDiscount();
    await paymentPage.fillCardDetail();
    await paymentPage.completePayment();
});
