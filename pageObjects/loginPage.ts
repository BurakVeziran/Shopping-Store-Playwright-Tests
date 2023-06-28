import { Page, Locator } from "@playwright/test";

export class LoginPage {
    private page: Page;
    private moveToSignupButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.moveToSignupButton = page.locator('[data-qa="go-to-signup-button"]');
    }

    moveToSignup = async (): Promise<void> => {
        await this.moveToSignupButton.waitFor();
        await this.moveToSignupButton.click();
        await this.page.waitForURL(/\/signup/, {timeout: 3000});
    }
}