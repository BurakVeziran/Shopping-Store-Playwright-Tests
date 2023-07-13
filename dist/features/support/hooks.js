"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixture = exports.page = exports.browser = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
exports.fixture = {
    // @ts-ignore
    page: undefined,
    logger: undefined
};
(0, cucumber_1.BeforeAll)({ timeout: 5 * 1000 }, async function () {
    exports.browser = await test_1.chromium.launch({
        headless: true,
    });
    exports.page = await exports.browser.newPage();
    exports.fixture.page = exports.page;
    return exports.page;
});
(0, cucumber_1.After)(async function (scenario) {
});
(0, cucumber_1.AfterAll)(async function () {
});
