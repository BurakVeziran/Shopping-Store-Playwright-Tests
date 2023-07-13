"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const productsPage_1 = require("../pageObjects/productsPage");
(0, test_1.test)("sortFeature", async ({ page }) => {
    const productPage = new productsPage_1.ProductsPage(page);
    await productPage.visit();
    await productPage.sortByCheapestComplexCheck();
    await productPage.sortByMostExpensiveComplexCheck();
});
