const cardNumber = document.getElementById("cardNum");
const cardHolder = document.getElementById("cardHolder");
const cardExpiryMonth = document.getElementById("cardExpiryMonth");
const cardExpiryYear = document.getElementById("cardExpiryYear");
const cardCVC = document.getElementById("cardCVC");
const form = document.getElementById("confirmationForm");
const inputsContainer = document.getElementById("id-inputsContainer");
const thankyouSection = document.getElementById("id-thankyouContainer");
const submitBtn = document.getElementById("submitBtn");
const userInputs = document.querySelectorAll("input");
const inputCardHolder = document.getElementById("in-holderName");
const inputCardNumber = document.getElementById("in-cardNumber");
const inputMonthExpiry = document.getElementById("in-cardExpiryMonth");
const inputYearExpiry = document.getElementById("in-cardExpiryYear");
const inputCardCVC = document.getElementById("in-cardCVC");
const cardDigits = [];
const numberPattern = /^[\d\s]+$/;
const abjadPattern = /^[a-zA-Z\s]+$/;

const creditCard = {
    owner: null,
    number: null,
    expiryMonth: null,
    expiryYear: null,
    cvc: null,
};

