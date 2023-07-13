"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Given, When, Then } = require('@cucumber/cucumber');
const { MyAccountPage } = require('../../pageObjects/myAccountPage');
const { getLoginToken } = require('../../ts/getLoginToken');
const { adminDetails } = require('../../ts/data');
const hooks_1 = require("../support/hooks");
let loginToken;
let myAccount;
let page;
Given('I have a valid login token', async function () {
    loginToken = await getLoginToken(adminDetails.username, adminDetails.password);
});
Given('I mock the user API to return a 500 error', async function () {
    await hooks_1.fixture.page.route("**/api/user**", route => {
        route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({ message: "PLAYWRIGHT ERROR FROM MOCKING" }),
        });
    });
});
When('I visit the My Account page', async function () {
    myAccount = new MyAccountPage(page);
    await hooks_1.fixture.page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode;
    }, [loginToken]);
    await myAccount.visit();
});
Then('I should see the page heading', async function () {
    await myAccount.waitForPageHeading();
});
Then('I should see an error message', async function () {
    await myAccount.waitForErrorMessage();
});
