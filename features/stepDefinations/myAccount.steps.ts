const { Given, When, Then } = require('@cucumber/cucumber');
const { MyAccountPage } = require('../../pageObjects/myAccountPage');
const { getLoginToken } = require('../../ts/getLoginToken');
const { adminDetails } = require('../../ts/data');
const { apiLogin } = require('../../pageObjects/ApiLogin');
import {fixture} from "../support/hooks";
let loginToken;
let myAccount;
let page;

Given('I have a valid login token', async function () {
    loginToken = await getLoginToken(adminDetails.username, adminDetails.password);
});

Given('I mock the user API to return a 500 error', async function () {
    fixture.page = page;
    const apiLoginInstance = new apiLogin(page);
    // await fixture.page.route("**/api/user**", route => {
    //     route.fulfill({
    //         status: 500,
    //         contentType: "application/json",
    //         body: JSON.stringify({ message: "PLAYWRIGHT ERROR FROM MOCKING" }),
    //     });
    // });
    await apiLoginInstance.apiLogin.mockApi();
});

When('I visit the My Account page', async function () {
    // myAccount = new MyAccountPage(page);
    // await fixture.page.evaluate(([loginTokenInsideBrowserCode]) => {
    //     document.cookie = "token=" + loginTokenInsideBrowserCode;
    // }, [loginToken]);
    // await myAccount.visit();
    await apiLogin.goToMyAccount();
});

Then('I should see the page heading', async function () {
    await myAccount.waitForPageHeading();
});

Then('I should see an error message', async function () {
    await myAccount.waitForErrorMessage();
});