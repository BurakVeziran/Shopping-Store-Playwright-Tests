import { Page, Locator } from "@playwright/test";
import {fixture} from "../features/support/hooks";
export class MyAccountPage {
    private page: Page;
    private pageHeading: Locator;
    private errorMessage: Locator;
    readonly goto;
    constructor(page: Page) {
        this.page = page;
        this.pageHeading = fixture.page.getByRole('heading', { name: 'My Account' });
        this.errorMessage = fixture.page.locator('[data-qa="error-message"]');
        this.goto = fixture.page.goto("http://localhost:2221/my-account");
    }

    visit = async (): Promise<void> => {
    await this.goto;
    }

    waitForPageHeading = async () => {
    await this.pageHeading.waitFor();
    }

    waitForErrorMessage = async (): Promise<void> => {
    await this.errorMessage.waitFor();
    }
}