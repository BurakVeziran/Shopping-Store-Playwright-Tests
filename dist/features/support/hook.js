"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.page = exports.browser = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
(0, cucumber_1.BeforeAll)({ timeout: 5 * 1000 }, async function () {
    exports.browser = await test_1.chromium.launch({
        headless: true,
    });
    exports.page = await exports.browser.newPage();
    return exports.page;
});
(0, cucumber_1.AfterAll)(async function () {
    return exports.browser.close();
});
(0, cucumber_1.After)(async function (scenario) {
    if (scenario.result?.status === cucumber_1.Status.FAILED) {
        const attach = this.attach;
        const screenshot = await exports.page.screenshot();
        return attach(screenshot, "image/png");
    }
});
