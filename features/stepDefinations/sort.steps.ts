import {Given, When} from "@cucumber/cucumber";
const { ProductsPage } = require('../../pageObjects/productsPage');

let page;
let productPage;
Given('I am on the Products page for sort test', async function () {
    productPage = new ProductsPage(page);
    await productPage.visit();
});

When('I sort the products by cheapest then the products should be sorted in ascending order by price', async function () {
    await productPage.sortByCheapestComplexCheck()
});

When('I sort the products by most expensive then the products should be sorted in descending order by price', async function () {
    await productPage.sortByMostExpensiveComplexCheck()
});

