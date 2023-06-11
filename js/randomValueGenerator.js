function randomValue (length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randomTextValue (length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randomNumberValue (length) {
    let result           = '';
    const characters       = '0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateRandomFutureDate() {
     const currentDate = new Date();
     const randomMonths = Math.floor(Math.random() * 12) + 1;
     const futureDate = new Date(currentDate.getFullYear(),
         currentDate.getMonth() + randomMonths);
     const month = (futureDate.getMonth() + 1).toString().padStart(2, '0');
     const year = futureDate.getFullYear().toString().substr(-2);
     const formattedDate = month + '/' + year;
     return formattedDate;
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