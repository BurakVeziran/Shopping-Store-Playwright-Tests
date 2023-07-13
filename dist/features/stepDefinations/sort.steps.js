"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const { ProductsPage } = require('../../pageObjects/productsPage');
let page;
let productPage;
(0, cucumber_1.Given)('I am on the Products page for sort test', async function () {
    productPage = new ProductsPage(page);
    await productPage.visit();
});
(0, cucumber_1.When)('I sort the products by cheapest then the products should be sorted in ascending order by price', async function () {
    await productPage.sortByCheapestComplexCheck();
});
(0, cucumber_1.When)('I sort the products by most expensive then the products should be sorted in descending order by price', async function () {
    await productPage.sortByMostExpensiveComplexCheck();
});
