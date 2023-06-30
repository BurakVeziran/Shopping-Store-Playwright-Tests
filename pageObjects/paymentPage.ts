import {expect, Page} from "@playwright/test";
import {creditCardInformation} from "../ts/data";

export class PaymentPage {
    private page: Page;
    private discountCode: import("@playwright/test").Locator;
    private discountInput: import("@playwright/test").Locator;
    private activateDiscountButton: import("@playwright/test").Locator;
    private totalValue: import("@playwright/test").Locator;
    private discountedValue: import("@playwright/test").Locator;
    private discountActiveMessage: import("@playwright/test").Locator;
    private creditCardOwnerInput: import("@playwright/test").Locator;
    private creditCardNumberInput: import("@playwright/test").Locator;
    private creditCardValidUntilInput: import("@playwright/test").Locator;
    private creditCardCvcInput: import("@playwright/test").Locator;
    private payButton: import("@playwright/test").Locator;


    constructor(page: Page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
            .locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.creditCardOwnerInput = page.getByPlaceholder("Credit card owner")
        this.creditCardNumberInput = page.getByPlaceholder("Credit card number")
        this.creditCardValidUntilInput = page.getByPlaceholder("Valid until")
        this.creditCardCvcInput = page.getByPlaceholder("Credit card CVC")
        this.payButton = page.locator('[data-qa="pay-button"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()

        // Option 1 for input lag: using .fill() with await expect()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)

        // Option 2 for input lag: slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        // expect(await this.discountInput.inputValue()).toBe(code)

        expect(await this.discountedValue.isVisible()).toBe(false)
        expect(await this.discountActiveMessage.isVisible()).toBe(false)

        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        // check that it displays "Discount activated"
        await this.discountActiveMessage.waitFor()
        // check that there is now a discounted price total showing
        await this.discountedValue.waitFor()
        const discountValueText = await this.discountedValue.innerText()
        const discountValueOnlyStringNumber = discountValueText.replace("$", "")
        const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueOnlyStringNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)
        // check that the discounted price total is smaller than the regular one
        expect(discountValueNumber).toBeLessThan(totalValueNumber)

    }

    fillCardDetail = async() => {
        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(creditCardInformation.cardOwner)

        await this.creditCardNumberInput.waitFor()
        await this.creditCardNumberInput.fill(creditCardInformation.cardNumber)

        await this.creditCardValidUntilInput.waitFor()
        await this.creditCardValidUntilInput.fill(creditCardInformation.validDate)

        await this.creditCardCvcInput.waitFor()
        await this.creditCardCvcInput.fill(creditCardInformation.cvc)

    }

    completePayment = async  () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
    }
}