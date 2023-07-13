"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const myAccountPage_1 = require("../pageObjects/myAccountPage");
const getLoginToken_1 = require("../ts/getLoginToken");
const data_1 = require("../ts/data");
(0, test_1.test)("My Account using cookie injection and mocking network ", async ({ page }) => {
    const loginToken = await (0, getLoginToken_1.getLoginToken)(data_1.adminDetails.username, data_1.adminDetails.password);
    await page.route("**/api/user**", async (route) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({ message: "PLAYWRIGHT ERROR FROM MOCKING" }),
        });
    });
    const myAccount = new myAccountPage_1.MyAccountPage(page);
    await myAccount.visit();
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode;
    }, [loginToken]);
    await myAccount.visit();
    await myAccount.waitForPageHeading();
    await myAccount.waitForErrorMessage();
});
