import {Given, When} from "@cucumber/cucumber";
const { ProductsPage } = require('../../pageObjects/productsPage');

let page;
let productPage;
Given('I am on the Products page to add product', async function () {
    productPage = new ProductsPage(page);
    await productPage.visit();
});

When('I add the product count then the product count should increase', async function () {
    await productPage.productCountAdd()
});


Given('I am on the Products page to remove product', async function () {
    productPage = new ProductsPage(page);
    await productPage.visit();
});

When('I remove the product count then the product count should decrease', async function () {
    await productPage.productCountRemove()
});
