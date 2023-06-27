import {test} from "@playwright/test";
import {productsPage} from "../pageObjects/productsPage.js";
import {Navigation} from "../pageObjects/navigation.js";
import {Checkout} from "../pageObjects/checkout.js";
import {LoginPage} from "../pageObjects/loginPage.js";
import {RegisterPage} from "../pageObjects/registerPage.js";
import {DeliveryDetailsPage} from "../pageObjects/deliveryDetailsPage.ts";
import {PaymentPage} from "../pageObjects/paymentPage.js";

test ("new User full end-to-end journey", async ({page}) => {
    const productPage = new productsPage (page)
    await productPage.visit()
    await productPage.sortByCheapestSimpleCheck()
    await productPage.addProductToBasket(0)
    await productPage.addProductToBasket(1)
    await productPage.addProductToBasket(2)
    const navigation = new Navigation(page)
    await navigation.goToCheckout()

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()

    const login = new LoginPage(page)
    await login.moveToSignup()

    const registerPage = new RegisterPage (page)
    await registerPage.signUpAsNewUser()

    const deliveryDetailsPage = new DeliveryDetailsPage(page)
    await deliveryDetailsPage.fillDetails()
    await deliveryDetailsPage.saveDetails()
    await deliveryDetailsPage.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillCardDetail()
    await paymentPage.completePayment()
})
