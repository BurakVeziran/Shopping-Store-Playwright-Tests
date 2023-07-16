import {randomTextValue} from "./randomValueGenerator";
import {randomNumberValue} from "./randomValueGenerator";
import {randomValue} from "./randomValueGenerator";
import {generateRandomFutureDate} from "./randomValueGenerator";

export const adminDetails: {username: string, password: string}= {
    username: "admin",
    password: "Admin123",
}

export const deliveryDetails: {firstName: string, lastName: string, street: string, postCode: string, city: string, country: string} = {
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