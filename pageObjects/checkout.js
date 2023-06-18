import {expect} from "@playwright/test";
import {productsPage} from "./productsPage.js";
export class Checkout {
    constructor(page) {
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.itemPrice = page.locator('[data-qa="basket-item-price"]')
        this.removeFormBasketButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
        this.checkoutMenuButton = page.getByRole('link', { name: 'Checkout' })
    }
    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.itemPrice.first().waitFor()
        const allPriceTexts = await this.itemPrice.allInnerTexts()
        const justNumbers = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace("$","")
            return parseInt(withoutDollarSign,10)
        })
        const smallestPrice = Math.min(justNumbers)
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.removeFormBasketButton.nth(smallestPriceIndex)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect (this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/, {timeout: 3000})
    }

    totalPrice = async () => {
       await this.checkoutMenuButton.waitFor()
       await this.checkoutMenuButton.click()
        let productPrices = await this.page.$$eval('[data-qa="basket-item-price"]', elements => elements.map(item => item.innerText));
        let output = [];
        for (let i = 0; i < productPrices.length; i++) {
            const text = productPrices[i].slice(0, -1);
            output.push(text);
        }
        const pricesJson =  JSON.stringify(output);
        const parsedProductPrices =  JSON.parse(pricesJson);
        const convertPricesToNumber = parsedProductPrices.map(function (x) {
            return parseInt(x, 10);
        });
        let calculatedTotalPrices = 0;
        convertPricesToNumber.forEach(item => {
            calculatedTotalPrices += item;
        });
        let totalPrice = await this.page.$$eval('[class="font-bold"]', elements => elements.map(item => item.innerText));
        let totalPriceWithoutDolarSign = [];
        for (let i = 0; i < totalPrice.length; i++) {
            const text = totalPrice[i].slice(0, -1);
            totalPriceWithoutDolarSign.push(text);
        }
        const convertTotalToNumber = totalPriceWithoutDolarSign.map(function (x) {
            return parseInt(x, 10);
        });
        expect([calculatedTotalPrices]).toEqual(convertTotalToNumber)
    }
}