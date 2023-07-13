"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterPage = void 0;
const data_1 = require("../ts/data");
const hooks_1 = require("../features/support/hooks");
class RegisterPage {
    page;
    emailInput;
    passwordInput;
    registerButton;
    gotoDeliveryDetails;
    constructor(page) {
        this.page = page;
        this.emailInput = hooks_1.fixture.page.getByPlaceholder('e-mail');
        this.passwordInput = hooks_1.fixture.page.getByPlaceholder('password');
        this.registerButton = hooks_1.fixture.page.getByRole('button', { name: 'register' });
        this.gotoDeliveryDetails = hooks_1.fixture.page.waitForURL("http://localhost:2221/signup?redirect=/delivery-details/");
    }
    signUpAsNewUser = async () => {
        await this.emailInput.waitFor();
        await this.emailInput.fill(data_1.loginInformation.randomEmail);
        await this.passwordInput.waitFor();
        await this.passwordInput.fill(data_1.loginInformation.randomPassword);
        await this.registerButton.waitFor();
        await this.registerButton.click();
        await this.gotoDeliveryDetails;
    };
}
exports.RegisterPage = RegisterPage;
