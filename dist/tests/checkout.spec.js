"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const checkout_1 = require("../pageObjects/checkout");
const productsPage_1 = require("../pageObjects/productsPage");
(0, test_1.test)("Checkout page Total Prices", async ({ page }) => {
    const productPage = new productsPage_1.ProductsPage(page);
    const checkout = new checkout_1.Checkout();
    await productPage.visit();
    await productPage.productCountAdd();
    await checkout.totalPrice();
});
