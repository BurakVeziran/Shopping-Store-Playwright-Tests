import {test} from "@playwright/test";
import {productsPage} from "../pageObjects/productsPage.js";

test ("sortFeature", async ({page}) => {
    const productPage = new productsPage (page)
    await productPage.visit()
    await productPage.sortByCheapestComplexCheck()
    await productPage.sortByMostExpensiveComplexCheck()
})
