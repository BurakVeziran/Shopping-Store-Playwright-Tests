import {expect} from "@playwright/test";
import {deliveryDetails} from "../ts/data.js";
import { Page, Locator } from "@playwright/test";

export class DeliveryDetailsPage {
    private page: Page;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private streetInput: Locator;
    private postcodeInput: Locator;
    private cityInput: Locator;
    private countryDropdown: Locator;
    private saveAddressButton: Locator;
    private savedAddressContainer: Locator;
    private savedAddressFirstName: Locator;
    private savedAddressLastName: Locator;
    private savedAddressStreet: Locator;
    private savedAddressPostcode: Locator;
    private savedAddressCity: Locator;
    private savedAddressCountry: Locator;
    private continueToPaymentButton: Locator;

    constructor(page) {
        this.page = page
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postcodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
    }

    fillDetails = async () => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(deliveryDetails.firstName)

        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(deliveryDetails.lastName)

        await this.streetInput.waitFor()
        await this.streetInput.fill(deliveryDetails.street)

        await this.postcodeInput.waitFor()
        await this.postcodeInput.fill(deliveryDetails.postCode);


        await this.cityInput.waitFor()
        await this.cityInput.fill(deliveryDetails.city)

        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(deliveryDetails.country)
    }
    saveDetails = async () => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await this.savedAddressContainer.waitFor()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)
        await this.savedAddressFirstName.first().waitFor()

        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())

        await this.savedAddressLastName.first().waitFor()
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())

        await this.savedAddressStreet.first().waitFor()
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())

        await this.savedAddressCity.first().waitFor()
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())

        await this.savedAddressPostcode.first().waitFor()
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postcodeInput.inputValue())

        await this.savedAddressCountry.first().waitFor()
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000 })
    }
}
