"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = void 0;
const isDesktopViewport_1 = require("../ts/isDesktopViewport");
const hooks_1 = require("../features/support/hooks");
class Navigation {
    page;
    basketCounter;
    checkoutLink;
    mobileBurgerButton;
    basketURL;
    constructor(page) {
        this.page = page;
        this.basketCounter = hooks_1.fixture.page.locator('[data-qa="header-basket-count"]');
        this.checkoutLink = hooks_1.fixture.page.getByRole('link', { name: 'Checkout' });
        this.mobileBurgerButton = hooks_1.fixture.page.locator('[data-qa="burger-button"]');
        this.basketURL = hooks_1.fixture.page.waitForURL("http://localhost:2221/basket");
    }
    getBasketCount = async () => {
        await this.basketCounter.waitFor();
        const text = await this.basketCounter.innerText();
        return parseInt(text, 10);
    };
    goToCheckout = async () => {
        if (!(0, isDesktopViewport_1.isDesktopViewport)(this.page)) {
            await this.mobileBurgerButton.waitFor();
            await this.mobileBurgerButton.click();
        }
        await this.checkoutLink.click();
        // await this.page.waitForURL("/basket");
        await this.basketURL;
    };
}
exports.Navigation = Navigation;
