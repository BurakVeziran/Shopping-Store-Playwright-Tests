"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
class LoginPage {
    fixture;
    page;
    signUp;
    moveToSignupButton;
    gotoSignup;
    constructor(page, fixture) {
        this.fixture = fixture;
        this.page = page;
        this.fixture = fixture;
        this.moveToSignupButton = fixture.page.locator('[data-qa="go-to-signup-button"]');
        this.signUp = fixture.page.locator('[data-qa="go-to-signup-button"]');
    }
    moveToSignup = async () => {
        await this.moveToSignupButton.click();
    };
}
exports.LoginPage = LoginPage;
