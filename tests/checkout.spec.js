import {test} from "@playwright/test";
import {Checkout} from "../pageObjects/checkout.js";
import {productsPage} from "../pageObjects/productsPage.js";

test ("Checkout page Total Prices", async ({page}) => {
    const productPage = new productsPage (page)
    const checkout = new Checkout(page)
    await productPage.visit()
    await productPage.productCountAdd()
    await checkout.totalPrice()
})
