import { isDesktopViewport } from "../ts/isDesktopViewport";
import { Page, Locator } from "@playwright/test";
import {fixture} from "../features/support/hooks";

export class Navigation {
    page: Page;
    basketCounter: Locator;
    checkoutLink: Locator;
    mobileBurgerButton: Locator;
    readonly basketURL

    constructor(page: Page) {
        this.page = page;
        this.basketCounter = fixture.page.locator('[data-qa="header-basket-count"]');
        this.checkoutLink = fixture.page.getByRole('link', { name: 'Checkout' });
        this.mobileBurgerButton = fixture.page.locator('[data-qa="burger-button"]');
        this.basketURL = fixture.page.waitForURL("http://localhost:2221/basket")
    }

    getBasketCount = async (): Promise<number> => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
    }

    goToCheckout = async (): Promise<void> => {
    if (!isDesktopViewport(this.page)) {
        await this.mobileBurgerButton.waitFor();
        await this.mobileBurgerButton.click();
    }
    await this.checkoutLink.click();
    // await this.page.waitForURL("/basket");
    await this.basketURL
    }
}
