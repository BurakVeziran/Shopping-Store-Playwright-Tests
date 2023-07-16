import { Page, Locator } from "@playwright/test";
import { loginInformation } from "../ts/data";
import {fixture} from "../features/support/hooks";
export class RegisterPage {
    private page: Page;
    private emailInput: Locator;
    private passwordInput: Locator;
    private registerButton: Locator;
    readonly gotoDeliveryDetails: any;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = fixture.page.getByPlaceholder('e-mail');
        this.passwordInput = fixture.page.getByPlaceholder('password');
        this.registerButton = fixture.page.getByRole('button', { name: 'register' });
        this.gotoDeliveryDetails = fixture.page.waitForURL("http://localhost:2221/signup?redirect=/delivery-details/");
    }

    signUpAsNewUser = async (): Promise<void> => {
    await this.emailInput.waitFor();
    await this.emailInput.fill(loginInformation.randomEmail);

    await this.passwordInput.waitFor();
    await this.passwordInput.fill(loginInformation.randomPassword);

    await this.registerButton.waitFor();
    await this.registerButton.click();
    };
}
