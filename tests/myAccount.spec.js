import { test } from "@playwright/test"
import { myAccountPage } from "../pageObjects/myAccountPage.js"
import { getLoginToken } from "../js/getLoginToken.js"
import { adminDetails } from "../js/data.js"

test.skip ("My Account using cookie injection and mocking network reques", async ({ page }) => {
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
        })
    })
    const myAccount = new myAccountPage(page)
    await myAccount.visit()
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()
})