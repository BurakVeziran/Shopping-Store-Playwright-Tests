"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomFutureDate = exports.randomNumberValue = exports.randomTextValue = exports.randomValue = void 0;
function randomValue(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.randomValue = randomValue;
function randomTextValue(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.randomTextValue = randomTextValue;
function randomNumberValue(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.randomNumberValue = randomNumberValue;
function generateRandomFutureDate() {
    const currentDate = new Date();
    const randomMonths = Math.floor(Math.random() * 12) + 1;
    const futureDate = new Date();
    futureDate.setMonth(currentDate.getMonth() + randomMonths);
    return futureDate.toLocaleDateString('en-US', {
        month: '2-digit',
        year: '2-digit',
    });
}
exports.generateRandomFutureDate = generateRandomFutureDate;
