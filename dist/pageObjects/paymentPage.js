"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentPage = void 0;
const test_1 = require("@playwright/test");
const data_1 = require("../ts/data");
const hooks_1 = require("../features/support/hooks");
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
        this.discountCode = hooks_1.fixture.page.frameLocator('[data-qa="active-discount-container"]')
            .locator('[data-qa="discount-code"]');
        this.discountInput = hooks_1.fixture.page.getByPlaceholder('Discount code');
        this.activateDiscountButton = hooks_1.fixture.page.locator('[data-qa="submit-discount-button"]');
        this.totalValue = hooks_1.fixture.page.locator('[data-qa="total-value"]');
        this.discountedValue = hooks_1.fixture.page.locator('[data-qa="total-with-discount-value"]');
        this.discountActiveMessage = hooks_1.fixture.page.locator('[data-qa="discount-active-message"]');
        this.creditCardOwnerInput = hooks_1.fixture.page.getByPlaceholder("Credit card owner");
        this.creditCardNumberInput = hooks_1.fixture.page.getByPlaceholder("Credit card number");
        this.creditCardValidUntilInput = hooks_1.fixture.page.getByPlaceholder("Valid until");
        this.creditCardCvcInput = hooks_1.fixture.page.getByPlaceholder("Credit card CVC");
        this.payButton = hooks_1.fixture.page.locator('[data-qa="pay-button"]');
    }
    activateDiscount = async () => {
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        await this.discountInput.waitFor();
        await this.discountInput.fill(code);
        await (0, test_1.expect)(this.discountInput).toHaveValue(code);
        (0, test_1.expect)(await this.discountedValue.isVisible()).toBe(false);
        (0, test_1.expect)(await this.discountActiveMessage.isVisible()).toBe(false);
        await this.activateDiscountButton.waitFor();
        await this.activateDiscountButton.click();
        await this.discountActiveMessage.waitFor();
        await this.discountedValue.waitFor();
        const discountValueText = await this.discountedValue.innerText();
        const discountValueOnlyStringNumber = discountValueText.replace("$", "");
        const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10);
        await this.totalValue.waitFor();
        const totalValueText = await this.totalValue.innerText();
        const totalValueOnlyStringNumber = totalValueText.replace("$", "");
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10);
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
    };
}
exports.PaymentPage = PaymentPage;
