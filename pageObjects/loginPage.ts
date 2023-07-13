import { Page, Locator } from "@playwright/test";
import {fixture} from "../features/support/hooks";
export class LoginPage {

    page: any;
    signUp: any;
    moveToSignupButton: any;

    constructor(page: Page, public fixture: any) {
        this.page = page;
        this.fixture = fixture;

        this.moveToSignupButton = fixture.page.locator('[data-qa="go-to-signup-button"]');

        // Not waiting for URL here
        this.signUp = fixture.page.locator('[data-qa="go-to-signup-button"]');
    }

    async moveToSignup() {
        try {
            await this.moveToSignupButton.click();

            // Wait for URL after click
            await this.page.waitForURL(/signup/);
        } catch (error) {
            // Handle errors
            console.error('Error navigating to signup', error);
        }
    }

}

// In test file

