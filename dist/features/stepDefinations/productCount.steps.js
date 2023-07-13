"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const { ProductsPage } = require('../../pageObjects/productsPage');
let page;
let productPage;
(0, cucumber_1.Given)('I am on the Products page to add product', async function () {
    productPage = new ProductsPage(page);
    await productPage.visit();
});
(0, cucumber_1.When)('I add the product count then the product count should increase', async function () {
    await productPage.productCountAdd();
});
(0, cucumber_1.Given)('I am on the Products page to remove product', async function () {
    productPage = new ProductsPage(page);
    await productPage.visit();
});
(0, cucumber_1.When)('I remove the product count then the product count should decrease', async function () {
    await productPage.productCountRemove();
});
