import {expect} from "@playwright/test";
import {Navigation} from "./navigation.js";
import { isDesktopViewport } from "../js/isDesktopViewport.js"
export class productsPage {
    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }


    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect (specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        let basketCountBeforeAdding = await navigation.getBasketCount()
        await specificAddButton.click()
        await expect (specificAddButton).toHaveText("Remove from Basket")
        if (isDesktopViewport(this.page)) {
            let basketCountAfterAdding = await navigation.getBasketCount()
            expect (basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }

    }

    sortByCheapestSimpleCheck = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts()
        expect (productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting)
    }

    sortByPriceComplexCheck = async (sortOption) => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        await this.sortDropdown.selectOption(sortOption)
        let productPrices = await this.page.$$eval('[datatype="product-price"]',
            elements => elements.map(item => item.innerText));
        let output = [];
        for (let i = 0; i < productPrices.length; i++) {
            const text = productPrices[i].slice(0, -1);
            output.push(text);
        }
        let pricesJson =  JSON.stringify(output);
        let parsedProductPrices =  JSON.parse(pricesJson);
        let firstOption =  parseInt(parsedProductPrices[0]);
        let SecondOption =  parseInt(parsedProductPrices[1]);
        let thirdOption =  parseInt(parsedProductPrices[2]);
        let fourthOption =  parseInt(parsedProductPrices[3]);
        let lastOption =  parseInt(parsedProductPrices[productPrices.length - 1]);

        if (sortOption === "price-asc") {
            expect(lastOption).toBeGreaterThan(firstOption);
            expect(lastOption).toBeGreaterThan(fourthOption);
            expect(fourthOption).toBeGreaterThan(thirdOption);
            expect(thirdOption).toBeGreaterThan(SecondOption);
            expect(SecondOption).toBeGreaterThan(firstOption);
        } else if (sortOption === "price-desc") {
            expect(lastOption).toBeLessThan(firstOption);
            expect(lastOption).toBeLessThan(fourthOption);
            expect(fourthOption).toBeLessThan(thirdOption);
            expect(thirdOption).toBeLessThan(SecondOption);
            expect(SecondOption).toBeLessThan(firstOption);
        }
    }

    sortByCheapestComplexCheck = async () => {
        await this.sortByPriceComplexCheck("price-asc");
    }

    sortByMostExpensiveComplexCheck = async () => {
        await this.sortByPriceComplexCheck("price-desc");
    }

    productButtonOperation = async (buttonIndex, operation) => {
        let button = this.addButtons.nth(buttonIndex)
        await button.waitFor()
        await button.click()
        await expect (button).toHaveText(operation === 'add' ? "Remove from Basket" : "Add to Basket")
    }

    productCountAdd = async () => {
        const navigation = new Navigation(this.page)
        await this.productButtonOperation(0, 'add')
        await this.productButtonOperation(2, 'add')
        await this.productButtonOperation(4, 'add')
        // only desktop viewport
        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect (basketCountAfterAdding).toBeGreaterThan(0)
            expect (basketCountAfterAdding).toBeGreaterThan(1)
            expect (basketCountAfterAdding).toBeGreaterThan(2)
            expect (basketCountAfterAdding).toBeLessThan(4)
        }
    }

    productCountRemove = async () => {
        const navigation = new Navigation(this.page)
        await this.productButtonOperation(0, 'add')
        await this.productButtonOperation(2, 'add')
        await this.productButtonOperation(4, 'add')
        await this.productButtonOperation(2, 'remove')
        await this.productButtonOperation(4, 'remove')
        // only desktop viewport
        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect (basketCountAfterAdding).toBeGreaterThan(0)
            expect (basketCountAfterAdding).toBeLessThan(2)
        }
    }
}









