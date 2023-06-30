import {test} from "@playwright/test";
import {ProductsPage} from "../pageObjects/productsPage";

test ("sortFeature", async ({page}) => {
    const productPage = new ProductsPage (page)
    await productPage.visit()
    await productPage.sortByCheapestComplexCheck()
    await productPage.sortByMostExpensiveComplexCheck()
})
