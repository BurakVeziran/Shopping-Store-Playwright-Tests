"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyAccountPage = void 0;
const hooks_1 = require("../features/support/hooks");
class MyAccountPage {
    page;
    pageHeading;
    errorMessage;
    goto;
    constructor(page) {
        this.page = page;
        this.pageHeading = hooks_1.fixture.page.getByRole('heading', { name: 'My Account' });
        this.errorMessage = hooks_1.fixture.page.locator('[data-qa="error-message"]');
        this.goto = hooks_1.fixture.page.goto("http://localhost:2221/my-account");
    }
    visit = async () => {
        await this.goto;
    };
    waitForPageHeading = async () => {
        await this.pageHeading.waitFor();
    };
    waitForErrorMessage = async () => {
        await this.errorMessage.waitFor();
    };
}
exports.MyAccountPage = MyAccountPage;
