import { After, AfterAll, BeforeAll, World } from '@cucumber/cucumber';
import {chromium, Browser, Page, Locator} from '@playwright/test';
import { Logger } from "winston";

export let browser: Browser;
export let page: Page;

export const fixture = {
    // @ts-ignore
    page: undefined as Page,
    logger: undefined as Logger,
    getByRole: undefined as Locator,
}

BeforeAll({ timeout: 5 * 1000 }, async function (this: World) {
    browser = await chromium.launch({
        headless: true,
    });
    page = await browser.newPage();
    fixture.page = page;
    return page;
});

After(async function (scenario) {
});

AfterAll(async function (this: World) {

});
