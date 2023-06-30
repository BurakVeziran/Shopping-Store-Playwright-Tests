import {test} from "@playwright/test";
import {ProductsPage} from "../pageObjects/productsPage";

test ("productCountAdd", async ({page}) => {
    const productPage = new ProductsPage (page)
    await productPage.visit()
    await productPage.productCountAdd()
})

test ("productCountRemove", async ({page}) => {
    const productPage = new ProductsPage (page)
    await productPage.visit()
    await productPage.productCountRemove()
})
