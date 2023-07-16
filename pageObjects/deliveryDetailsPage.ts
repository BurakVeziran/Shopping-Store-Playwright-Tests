import {expect} from "@playwright/test";
import {deliveryDetails} from "../ts/data";
import { Page, Locator } from "@playwright/test";
import {fixture} from "../features/support/hooks";

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
        this.firstNameInput = fixture.page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = fixture.page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = fixture.page.locator('[data-qa="delivery-address-street"]')
        this.postcodeInput = fixture.page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = fixture.page.locator('[data-qa="delivery-city"]')
        this.countryDropdown = fixture.page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton = fixture.page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainer = fixture.page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = fixture.page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = fixture.page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = fixture.page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostcode = fixture.page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = fixture.page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = fixture.page.locator('[data-qa="saved-address-country"]')
        this.continueToPaymentButton = fixture.page.getByRole('button', { name: 'Continue to payment' })
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
    }
}