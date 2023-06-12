import {randomTextValue} from "./randomValueGenerator.js";
import {randomNumberValue} from "./randomValueGenerator.js";
import {randomValue} from "./randomValueGenerator.js";
import {generateRandomFutureDate} from "./randomValueGenerator.js";
export const adminDetails = {
    username: "admin",
    password: process.env.ADMIN_PASSWORD,
}

export const deliveryDetails = {
    firstName: randomTextValue(5),
    lastName: randomTextValue(5),
    street: randomTextValue(5) + " " + randomValue(5),
    postCode: randomNumberValue(5),
    city: randomTextValue(5),
    country: "Turkey",
}

export const loginInformation = {
    randomEmail: randomValue(10)+"@gmail.com",
    randomPassword: randomValue(10),
}

export const creditCardInformation = {
    cardOwner: randomValue(5) + " " + randomValue(5),
    cardNumber: randomNumberValue(4) + " " + randomNumberValue(4) + " " +
        randomNumberValue(4) + " " + randomNumberValue(4),
    validDate: generateRandomFutureDate(),
    cvc: randomNumberValue(3)
}