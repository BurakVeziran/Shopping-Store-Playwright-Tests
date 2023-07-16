import { Page } from "@playwright/test";


export class LoginPage {

    page: any;
    signUp: any;
    moveToSignupButton: any;
    gotoSignup: any;

    constructor(page: Page, public fixture: any) {
        this.page = page;
        this.fixture = fixture;

        this.moveToSignupButton = fixture.page.locator('[data-qa="go-to-signup-button"]');
        this.signUp = fixture.page.locator('[data-qa="go-to-signup-button"]');
    }

    moveToSignup = async (): Promise<void> => {
            await this.moveToSignupButton.click();


    }
}


