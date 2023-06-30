import { Page, Locator } from "@playwright/test";
import { loginInformation } from "../ts/data";

export class RegisterPage {
    private page: Page;
    private emailInput: Locator;
    private passwordInput: Locator;
    private registerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('e-mail');
        this.passwordInput = page.getByPlaceholder('password');
        this.registerButton = page.getByRole('button', { name: 'register' });
    }

    signUpAsNewUser = async (): Promise<void> => {
    await this.emailInput.waitFor();
    await this.emailInput.fill(loginInformation.randomEmail);

    await this.passwordInput.waitFor();
    await this.passwordInput.fill(loginInformation.randomPassword);

    await this.registerButton.waitFor();
    await this.registerButton.click();
    await this.page.waitForURL(/\/delivery-details/, { timeout: 3000 });
    };
}
