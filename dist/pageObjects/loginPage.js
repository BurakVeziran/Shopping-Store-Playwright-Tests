"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
class LoginPage {
    fixture;
    page;
    signUp;
    moveToSignupButton;
    constructor(page, fixture) {
        this.fixture = fixture;
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
        }
        catch (error) {
            // Handle errors
            console.error('Error navigating to signup', error);
        }
    }
}
exports.LoginPage = LoginPage;
// In test file
