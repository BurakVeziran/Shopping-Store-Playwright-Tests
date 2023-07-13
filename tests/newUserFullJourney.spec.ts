import {test} from "@playwright/test";
import {ProductsPage} from "../pageObjects/productsPage";
import {Navigation} from "../pageObjects/navigation";
import {Checkout} from "../pageObjects/checkout";
import {LoginPage} from "../pageObjects/loginPage";
import {RegisterPage} from "../pageObjects/registerPage";
import {DeliveryDetailsPage} from "../pageObjects/deliveryDetailsPage";
import {PaymentPage} from "../pageObjects/paymentPage";
import {fixture} from "../features/support/hooks";

test ("new User full end-to-end journey", async ({page}) => {
    const productPage = new ProductsPage (page)
    await productPage.visit()
    await productPage.sortByCheapestSimpleCheck()
    await productPage.addProductToBasket(0)
    await productPage.addProductToBasket(1)
    await productPage.addProductToBasket(2)
    const navigation = new Navigation(page)
    await navigation.goToCheckout()

    const checkout = new Checkout()
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()

    const login = new LoginPage(page, fixture)
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
