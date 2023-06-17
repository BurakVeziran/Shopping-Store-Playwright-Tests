import {test} from "@playwright/test";
import {productsPage} from "../pageObjects/productsPage.js";

test ("productCountAdd", async ({page}) => {
    const productPage = new productsPage (page)
    await productPage.visit()
    await productPage.productCountAdd()


})

test ("productCountRemove", async ({page}) => {
    const productPage = new productsPage (page)
    await productPage.visit()
    await productPage.productCountRemove()
})
