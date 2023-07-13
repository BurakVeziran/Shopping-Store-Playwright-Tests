"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkout = void 0;
const test_1 = require("@playwright/test");
const AbstractPageObject_1 = require("../../pageObjects/AbstractPageObject");
const hook_1 = require("../support/hook");
class Checkout extends AbstractPageObject_1.AbstractPageObject {
    basketCards;
    itemPrice;
    removeFormBasketButton;
    continueToCheckoutButton;
    checkoutMenuButton;
    constructor() {
        super(hook_1.page);
        this.basketCards = hook_1.page.locator('[data-qa="basket-card"]');
        this.itemPrice = hook_1.page.locator('[data-qa="basket-item-price"]');
        this.removeFormBasketButton = hook_1.page.locator('[data-qa="basket-card-remove-item"]');
        this.continueToCheckoutButton = hook_1.page.locator('[data-qa="continue-to-checkout"]');
        this.checkoutMenuButton = hook_1.page.getByRole('link', { name: 'Checkout' });
    }
    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor();
        const itemsBeforeRemoval = await this.basketCards.count();
        await this.itemPrice.first().waitFor();
        const allPriceTexts = await this.itemPrice.allInnerTexts();
        const justNumbers = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace("$", "");
            return parseInt(withoutDollarSign, 10);
        });
        const smallestPrice = Math.min(...justNumbers);
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice);
        const specificRemoveButton = this.removeFormBasketButton.nth(smallestPriceIndex);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();
        await (0, test_1.expect)(this.basketCards).toHaveCount(itemsBeforeRemoval - 1);
    };
    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor();
        await this.continueToCheckoutButton.click();
        await this.page.waitForURL(/\/login/, { timeout: 3000 });
    };
    totalPrice = async () => {
        await this.checkoutMenuButton.waitFor();
        await this.checkoutMenuButton.click();
        let productPrices = await this.page.$$eval('[data-qa="basket-item-price"]', (elements) => elements.map(item => item.innerText));
        let output = [];
        for (let i = 0; i < productPrices.length; i++) {
            const text = productPrices[i].slice(0, -1);
            output.push(text);
        }
        const pricesJson = JSON.stringify(output);
        const parsedProductPrices = JSON.parse(pricesJson);
        const convertPricesToNumber = parsedProductPrices.map((x) => {
            return parseInt(x, 10);
        });
        let calculatedTotalPrices = 0;
        convertPricesToNumber.forEach(item => {
            calculatedTotalPrices += item;
        });
        let totalPrice = await this.page.$$eval('[class="font-bold"]', (elements) => elements.map(item => item.innerText));
        let totalPriceWithoutDollarSign = [];
        for (let i = 0; i < totalPrice.length; i++) {
            const text = totalPrice[i].slice(0, -1);
            totalPriceWithoutDollarSign.push(text);
        }
        const convertTotalToNumber = totalPriceWithoutDollarSign.map((x) => {
            return parseInt(x, 10);
        });
        (0, test_1.expect)([calculatedTotalPrices]).toEqual(convertTotalToNumber);
    };
}
exports.Checkout = Checkout;
