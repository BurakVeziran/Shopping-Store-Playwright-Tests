import {test} from "@playwright/test";
import {Checkout} from "../pageObjects/checkout";
import {ProductsPage} from "../pageObjects/productsPage";

test ("Checkout page Total Prices", async ({page}) => {
    const productPage = new ProductsPage (page)
    const checkout = new Checkout()
    await productPage.visit()
    await productPage.productCountAdd()
    await checkout.totalPrice()
})
