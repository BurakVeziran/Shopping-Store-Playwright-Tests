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
        // only desktop viewport
        let basketCountBeforeAdding = 0
        if (isDesktopViewport(this.page)) {
            const basketCountBeforeAdding = await navigation.getBasketCount()
            expect (basketCountBeforeAdding) === 0
        }
        await specificAddButton.click()
        await expect (specificAddButton).toHaveText("Remove from Basket")
        // only desktop viewport
        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount()
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

     sortByCheapestComplexCheck = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        await this.sortDropdown.selectOption("price-asc")
        let productPrices = await this.page.$$eval('[datatype="product-price"]',
                elements => elements.map(item => item.innerText));
        let output = [];
        for (let i = 0; i < productPrices.length; i++) {
            const text = productPrices[i].slice(0, -1);
            output.push(text);
        }
        const pricesJson =  JSON.stringify(output);
        const parsedProductPrices =  JSON.parse(pricesJson);
        const firstOption =  parseInt(parsedProductPrices[0]);
        const SecondOption =  parseInt(parsedProductPrices[1]);
        const thirdOption =  parseInt(parsedProductPrices[2]);
        const fourthOption =  parseInt(parsedProductPrices[3]);
        const lastOption =  parseInt(parsedProductPrices[productPrices.length - 1]);
        expect(lastOption).toBeGreaterThan(firstOption);
        expect(lastOption).toBeGreaterThan(fourthOption);
        expect(fourthOption).toBeGreaterThan(thirdOption);
        expect(thirdOption).toBeGreaterThan(SecondOption);
        expect(SecondOption).toBeGreaterThan(firstOption);
    }

    sortByMostExpensiveComplexCheck = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        await this.sortDropdown.selectOption("price-desc")
        let productPrices = await this.page.$$eval('[datatype="product-price"]',
                elements => elements.map(item => item.innerText));
        let output = [];
        for (let i = 0; i < productPrices.length; i++) {
            const text = productPrices[i].slice(0, -1);
            output.push(text);
        }
        const pricesJson =  JSON.stringify(output);
        const parsedProductPrices =  JSON.parse(pricesJson);
        const firstOption =  parseInt(parsedProductPrices[0]);
        const SecondOption =  parseInt(parsedProductPrices[1]);
        const thirdOption =  parseInt(parsedProductPrices[2]);
        const fourthOption =  parseInt(parsedProductPrices[3]);
        const lastOption =  parseInt(parsedProductPrices[productPrices.length - 1]);
        expect(lastOption).toBeLessThan(firstOption);
        expect(lastOption).toBeLessThan(fourthOption);
        expect(fourthOption).toBeLessThan(thirdOption);
        expect(thirdOption).toBeLessThan(SecondOption);
        expect(SecondOption).toBeLessThan(firstOption);
    }

    productCountAdd = async () => {
        const firstAddButton = this.addButtons.nth(0)
        const secondAddButton = this.addButtons.nth(2)
        const fifthAddButton = this.addButtons.nth(4)
        await firstAddButton.waitFor()
        await secondAddButton.waitFor()
        await fifthAddButton.waitFor()
        await expect (firstAddButton).toHaveText("Add to Basket")
        await expect (secondAddButton).toHaveText("Add to Basket")
        await expect (fifthAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        // only desktop viewport
        if (isDesktopViewport(this.page)) {
            const basketCountBeforeAdding = await navigation.getBasketCount()
            expect (basketCountBeforeAdding) === 0
        }
        await firstAddButton.click()
        await secondAddButton.click()
        await fifthAddButton.click()
        await expect (firstAddButton).toHaveText("Remove from Basket")
        await expect (secondAddButton).toHaveText("Remove from Basket")
        await expect (fifthAddButton).toHaveText("Remove from Basket")
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
        const firstAddButton = this.addButtons.nth(0)
        const secondAddButton = this.addButtons.nth(2)
        const fifthAddButton = this.addButtons.nth(4)
        await firstAddButton.waitFor()
        await secondAddButton.waitFor()
        await fifthAddButton.waitFor()
        await expect (firstAddButton).toHaveText("Add to Basket")
        await expect (secondAddButton).toHaveText("Add to Basket")
        await expect (fifthAddButton).toHaveText("Add to Basket")
        await firstAddButton.click()
        await secondAddButton.click()
        await fifthAddButton.click()
        await expect (firstAddButton).toHaveText("Remove from Basket")
        await expect (secondAddButton).toHaveText("Remove from Basket")
        await expect (fifthAddButton).toHaveText("Remove from Basket")
        const navigation = new Navigation(this.page)
        // only desktop viewport
        if (isDesktopViewport(this.page)) {
            const basketCountBeforeAdding = await navigation.getBasketCount()
            expect (basketCountBeforeAdding) === 0
        }
        await secondAddButton.click()
        await fifthAddButton.click()
        await expect (secondAddButton).toHaveText("Add to Basket")
        await expect (fifthAddButton).toHaveText("Add to Basket")
        // only desktop viewport
        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect (basketCountAfterAdding).toBeGreaterThan(0)
            expect (basketCountAfterAdding).toBeLessThan(2)
        }
    }
}





