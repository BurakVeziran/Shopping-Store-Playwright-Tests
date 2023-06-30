import { test } from "@playwright/test"
import { MyAccountPage } from "../pageObjects/myAccountPage"
import { getLoginToken } from "../ts/getLoginToken"
import { adminDetails } from "../ts/data"

test ("My Account using cookie injection and mocking network ", async ({ page }) => {
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    await page.route("**/api/user**", async (route) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
        })
    })
    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()
})