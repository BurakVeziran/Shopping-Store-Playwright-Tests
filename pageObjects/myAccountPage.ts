import { Page, Locator } from "@playwright/test";

export class MyAccountPage {
    private page: Page;
    private pageHeading: Locator;
    private errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.getByRole('heading', { name: 'My Account' });
        this.errorMessage = page.locator('[data-qa="error-message"]');
    }

    visit = async (): Promise<void> => {
    await this.page.goto("/my-account");
    }

    waitForPageHeading = async (): Promise<void> => {
    await this.pageHeading.waitFor();
    }

    waitForErrorMessage = async (): Promise<void> => {
    await this.errorMessage.waitFor();
    }
}
