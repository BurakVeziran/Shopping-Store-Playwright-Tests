"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryDetailsPage = void 0;
const test_1 = require("@playwright/test");
const data_1 = require("../ts/data");
class DeliveryDetailsPage {
    page;
    firstNameInput;
    lastNameInput;
    streetInput;
    postcodeInput;
    cityInput;
    countryDropdown;
    saveAddressButton;
    savedAddressContainer;
    savedAddressFirstName;
    savedAddressLastName;
    savedAddressStreet;
    savedAddressPostcode;
    savedAddressCity;
    savedAddressCountry;
    continueToPaymentButton;
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
        this.streetInput = page.locator('[data-qa="delivery-address-street"]');
        this.postcodeInput = page.locator('[data-qa="delivery-postcode"]');
        this.cityInput = page.locator('[data-qa="delivery-city"]');
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' });
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]');
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]');
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]');
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
        this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]');
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]');
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' });
    }
    fillDetails = async () => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(data_1.deliveryDetails.firstName);
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(data_1.deliveryDetails.lastName);
        await this.streetInput.waitFor();
        await this.streetInput.fill(data_1.deliveryDetails.street);
        await this.postcodeInput.waitFor();
        await this.postcodeInput.fill(data_1.deliveryDetails.postCode);
        await this.cityInput.waitFor();
        await this.cityInput.fill(data_1.deliveryDetails.city);
        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption(data_1.deliveryDetails.country);
    };
    saveDetails = async () => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count();
        await this.saveAddressButton.waitFor();
        await this.saveAddressButton.click();
        await this.savedAddressContainer.waitFor();
        await (0, test_1.expect)(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1);
        await this.savedAddressFirstName.first().waitFor();
        await this.savedAddressFirstName.first().waitFor();
        (0, test_1.expect)(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue());
        await this.savedAddressLastName.first().waitFor();
        (0, test_1.expect)(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue());
        await this.savedAddressStreet.first().waitFor();
        (0, test_1.expect)(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue());
        await this.savedAddressCity.first().waitFor();
        (0, test_1.expect)(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue());
        await this.savedAddressPostcode.first().waitFor();
        (0, test_1.expect)(await this.savedAddressPostcode.first().innerText()).toBe(await this.postcodeInput.inputValue());
        await this.savedAddressCountry.first().waitFor();
        (0, test_1.expect)(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue());
    };
    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor();
        await this.continueToPaymentButton.click();
        await this.page.waitForURL(/\/payment/, { timeout: 3000 });
    };
}
exports.DeliveryDetailsPage = DeliveryDetailsPage;
