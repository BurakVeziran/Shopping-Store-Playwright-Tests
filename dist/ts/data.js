"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditCardInformation = exports.loginInformation = exports.deliveryDetails = exports.adminDetails = void 0;
const randomValueGenerator_1 = require("./randomValueGenerator");
const randomValueGenerator_2 = require("./randomValueGenerator");
const randomValueGenerator_3 = require("./randomValueGenerator");
const randomValueGenerator_4 = require("./randomValueGenerator");
exports.adminDetails = {
    username: "admin",
    password: "Admin123",
};
exports.deliveryDetails = {
    firstName: (0, randomValueGenerator_1.randomTextValue)(5),
    lastName: (0, randomValueGenerator_1.randomTextValue)(5),
    street: (0, randomValueGenerator_1.randomTextValue)(5) + " " + (0, randomValueGenerator_3.randomValue)(5),
    postCode: (0, randomValueGenerator_2.randomNumberValue)(5),
    city: (0, randomValueGenerator_1.randomTextValue)(5),
    country: "Turkey",
};
exports.loginInformation = {
    randomEmail: (0, randomValueGenerator_3.randomValue)(10) + "@gmail.com",
    randomPassword: (0, randomValueGenerator_3.randomValue)(10),
};
exports.creditCardInformation = {
    cardOwner: (0, randomValueGenerator_3.randomValue)(5) + " " + (0, randomValueGenerator_3.randomValue)(5),
    cardNumber: (0, randomValueGenerator_2.randomNumberValue)(4) + " " + (0, randomValueGenerator_2.randomNumberValue)(4) + " " +
        (0, randomValueGenerator_2.randomNumberValue)(4) + " " + (0, randomValueGenerator_2.randomNumberValue)(4),
    validDate: (0, randomValueGenerator_4.generateRandomFutureDate)(),
    cvc: (0, randomValueGenerator_2.randomNumberValue)(3)
};
