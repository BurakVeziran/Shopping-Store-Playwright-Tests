import { test } from "@playwright/test"
import { myAccountPage } from "../pageObjects/myAccountPage.js"
import { getLoginToken } from "../ts/getLoginToken.js"
import { adminDetails } from "../ts/data.ts"

test ("My Account using cookie injection and mocking network " +
    "request", async ({ page }) => {
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