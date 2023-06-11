import {loginInformation} from "../js/randomValueGenerator.js";
export class RegisterPage {
    constructor(page) {
        this.page = page

        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByPlaceholder('password')
        this.registerButton = page.getByRole('button', { name: 'register' })

    }
    signUpAsNewUser = async () => {
        await this.emailInput.waitFor()
        await this.emailInput.fill(loginInformation.randomEmail)

        await this.passwordInput.waitFor()
        await this.passwordInput.fill(loginInformation.randomPassword)

        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.waitForURL(/\/delivery-details/, {timeout: 3000})
    }
}

