"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentPage = void 0;
const test_1 = require("@playwright/test");
const data_1 = require("../ts/data");
class PaymentPage {
    page;
    discountCode;
    discountInput;
    activateDiscountButton;
    totalValue;
    discountedValue;
    discountActiveMessage;
    creditCardOwnerInput;
    creditCardNumberInput;
    creditCardValidUntilInput;
    creditCardCvcInput;
    payButton;
    constructor(page) {
        this.page = page;
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
            .locator('[data-qa="discount-code"]');
        this.discountInput = page.getByPlaceholder('Discount code');
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]');
        this.totalValue = page.locator('[data-qa="total-value"]');
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]');
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]');
        this.creditCardOwnerInput = page.getByPlaceholder("Credit card owner");
        this.creditCardNumberInput = page.getByPlaceholder("Credit card number");
        this.creditCardValidUntilInput = page.getByPlaceholder("Valid until");
        this.creditCardCvcInput = page.getByPlaceholder("Credit card CVC");
        this.payButton = page.locator('[data-qa="pay-button"]');
    }
    activateDiscount = async () => {
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        await this.discountInput.waitFor();
        // Option 1 for input lag: using .fill() with await expect()
        await this.discountInput.fill(code);
        await (0, test_1.expect)(this.discountInput).toHaveValue(code);
        // Option 2 for input lag: slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        // expect(await this.discountInput.inputValue()).toBe(code)
        (0, test_1.expect)(await this.discountedValue.isVisible()).toBe(false);
        (0, test_1.expect)(await this.discountActiveMessage.isVisible()).toBe(false);
        await this.activateDiscountButton.waitFor();
        await this.activateDiscountButton.click();
        // check that it displays "Discount activated"
        await this.discountActiveMessage.waitFor();
        // check that there is now a discounted price total showing
        await this.discountedValue.waitFor();
        const discountValueText = await this.discountedValue.innerText();
        const discountValueOnlyStringNumber = discountValueText.replace("$", "");
        const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10);
        await this.totalValue.waitFor();
        const totalValueText = await this.totalValue.innerText();
        const totalValueOnlyStringNumber = totalValueText.replace("$", "");
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10);
        // check that the discounted price total is smaller than the regular one
        (0, test_1.expect)(discountValueNumber).toBeLessThan(totalValueNumber);
    };
    fillCardDetail = async () => {
        await this.creditCardOwnerInput.waitFor();
        await this.creditCardOwnerInput.fill(data_1.creditCardInformation.cardOwner);
        await this.creditCardNumberInput.waitFor();
        await this.creditCardNumberInput.fill(data_1.creditCardInformation.cardNumber);
        await this.creditCardValidUntilInput.waitFor();
        await this.creditCardValidUntilInput.fill(data_1.creditCardInformation.validDate);
        await this.creditCardCvcInput.waitFor();
        await this.creditCardCvcInput.fill(data_1.creditCardInformation.cvc);
    };
    completePayment = async () => {
        await this.payButton.waitFor();
        await this.payButton.click();
        await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
    };
}
exports.PaymentPage = PaymentPage;
