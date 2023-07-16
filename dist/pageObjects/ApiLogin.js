"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLogin = void 0;
const hooks_1 = require("../features/support/hooks");
const myAccountPage_1 = require("./myAccountPage");
class apiLogin {
    page;
    logger;
    myAccount;
    constructor(page) {
        this.page = page;
        this.myAccount = new myAccountPage_1.MyAccountPage(page);
    }
    mockApi = async () => {
        await hooks_1.fixture.page.route("**/api/user**", (route) => {
            route.fulfill({
                status: 500,
                contentType: "application/json",
                body: JSON.stringify({ message: "PLAYWRIGHT ERROR FROM MOCKING" }),
            });
        });
    };
    goToMyAccount = async (loginToken) => {
        await this.page.evaluate(([loginTokenInsideBrowserCode]) => {
            document.cookie = "token=" + loginTokenInsideBrowserCode;
        }, [loginToken]);
        await this.myAccount.visit();
    };
}
exports.apiLogin = apiLogin;
