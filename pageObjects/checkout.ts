import { expect } from "@playwright/test";
import { Page, Locator } from "@playwright/test";

export class Checkout {
    private page: Page;
    private basketCards: Locator;
    private itemPrice: Locator;
    private removeFormBasketButton: Locator;
    private continueToCheckoutButton: Locator;
    private checkoutMenuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.basketCards = page.locator('[data-qa="basket-card"]');
        this.itemPrice = page.locator('[data-qa="basket-item-price"]');
        this.removeFormBasketButton = page.locator('[data-qa="basket-card-remove-item"]');
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');
        this.checkoutMenuButton = page.getByRole('link', { name: 'Checkout' });
    }

    public removeCheapestProduct = async (): Promise<void> => {
        await this.basketCards.first().waitFor();
        const itemsBeforeRemoval = await this.basketCards.count();
        await this.itemPrice.first().waitFor();
        const allPriceTexts = await this.itemPrice.allInnerTexts();
        const justNumbers = allPriceTexts.map((element: string) => {
            const withoutDollarSign = element.replace("$","");
            return parseInt(withoutDollarSign,10);
        });
        const smallestPrice = Math.min(...justNumbers);
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice);
        const specificRemoveButton = this.removeFormBasketButton.nth(smallestPriceIndex);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1);
    }

    public continueToCheckout = async (): Promise<void> => {
        await this.continueToCheckoutButton.waitFor();
        await this.continueToCheckoutButton.click();
        await this.page.waitForURL(/\/login/, {timeout: 3000});
    }

    public totalPrice = async (): Promise<void> => {
        await this.checkoutMenuButton.waitFor();
        await this.checkoutMenuButton.click();
        let productPrices: string[] = await this.page.$$eval('[data-qa="basket-item-price"]',
            (elements: any[]) => elements.map(item => item.innerText));
        let output: string[] = [];
        for (let i = 0; i < productPrices.length; i++) {
            const text = productPrices[i].slice(0, -1);
            output.push(text);
        }
        const pricesJson =  JSON.stringify(output);
        const parsedProductPrices: string[] =  JSON.parse(pricesJson);
        const convertPricesToNumber: number[] = parsedProductPrices.map((x: string) => {
            return parseInt(x, 10);
        });
        let calculatedTotalPrices = 0;
        convertPricesToNumber.forEach(item => {
            calculatedTotalPrices += item;
        });
        let totalPrice: string[] = await this.page.$$eval('[class="font-bold"]',
            (elements: any[]) => elements.map(item => item.innerText));
        let totalPriceWithoutDollarSign: string[] = [];
        for (let i = 0; i < totalPrice.length; i++) {
            const text = totalPrice[i].slice(0, -1);
            totalPriceWithoutDollarSign.push(text);
        }
        const convertTotalToNumber: number[] = totalPriceWithoutDollarSign.map((x: string) => {
            return parseInt(x, 10);
        });
        expect([calculatedTotalPrices]).toEqual(convertTotalToNumber);
    }
}
