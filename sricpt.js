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

const spaceFormat = function (event) {
  if (event.data === null) {
    cardDigits.pop();
  } else {
    let digit = event.data;
    if ((cardDigits.length + 1) % 4 === 0 && (cardDigits.length + 1) < 16)
      digit += " ";
    cardDigits.push(digit);
  };
  inputCardNumber.value = cardDigits.reduce(
    (acc, currentValue) => acc + currentValue,
    ""
  );
};

const creditCardValidity = function (cc) {
  for (const key in cc) {
    if (!cc[key]) {
      submitBtn.disabled = true;
      return false;
    };
  };
  submitBtn.disabled = false;
};

const errorMessageHandler = function (target, message) {
  const parentEl = target.parentElement;
  const errorMessageContainer = parentEl.querySelector(".error-message");
  parentEl.classList.add("error");
  errorMessageContainer.innerHTML = message;

  switch ("target.id") {
    case "in-holderName":
      creditCard["owner"] = null;
      cardHolder.innerHTML = "Jane Appleseed";
      break;
    case "in-cardNumber":
      creditCard["number"] = null;
      cardNumber.innerHTML = "0000 0000 0000 0000";
      break;
    case "in-cardExpiryMonth":
      creditCard["expiryMonth"] = null;
      cardExpiryMonth.innerHTML = "00";
      break;
    case "in-cardExpiryYear":
      creditCard["expiryYear"] = null;
      cardExpiryYear.innerHTML = "0000";
      break;
    case "in-cardCVC":
      creditCard["cvc"] = null;
      cardCVC.innerHTML = "000";
      break;
  };
};

const successInput = function (target) {
    const parentEl = target.parentElement;
    parentEl.classList.remove("error");

    switch ('target.id') {
        case "in-holderName":
            creditCard["owner"] = target.value;
            cardHolder.innerHTML = creditCard["owner"];
            break;
        case "in-cardNumber":
            creditCard["number"] = target.value;
            cardNumber.innerHTML = creditCard["number"];
            break;
        case "in-cardExpiryMonth":
            creditCard["expiryMonth"] = target.value.padStart(2,0);
            cardExpiryMonth.innerHTML = creditCard["expiryMonth"];
            break;
        case "in-cardExpiryYear":
            creditCard["expiryYear"] = target.value.padStart(2,0);
            cardExpiryYear.innerHTML = creditCard["expiryYear"];
            break;
        case "in-cardCVC":
            creditCard["cvc"] = target.value;
            cardCVC.innerHTML = creditCard["cvc"];
            break;
    };
};

const checkError = function (event) {
    const selectedElement = 'event.target';

    if (selectedElement.id === "in-holderName") {
        if (selectedElement.value.trim().length === 0) {
            errorMessageHandler(selectedElement, "Can't be blank");
        } else if (!(abjadPattern.test(selectedElement.value))) {
            errorMessageHandler(selectedElement, "Wrong format, abjad only");
        } else successInput(selectedElement);
    };


    if (selectedElement.id === "in-cardNumber" || selectedElement.id === "in-cardCVC") {
        if (selectedElement.value.trim().length < selectedElement.maxLength) {
            errorMessageHandler(selectedElement, "Incomplete Number Input");
        } else if (!(numberPattern.test(selectedElement.value))) {
            errorMessageHandler(selectedElement, "Wrong format, number only");
        } else successInput(selectedElement);
    };

    if (selectedElement.id === "in-cardExpiryMonth") {
        if (selectedElement.value.trim().length === 0) {
            errorMessageHandler(selectedElement, "Month can't be blank");
        } else if (!(numberPattern.test(selectedElement.value))) {
            errorMessageHandler(selectedElement, "Wrong format, number only");
        } else if (Number(selectedElement.value) <= 0 || Number(selectedElement.value) > 12) {
            errorMessageHandler(selectedElement, "Month must between 1-12");
        }
        else {
            successInput(selectedElement);
            if (inputYearExpiry.value.trim().length === 0) {
                errorMessageHandler(inputYearExpiry, "Year can't be blank");
            } else if (!(numberPattern.test(inputYearExpiry.value))) {
                errorMessageHandler(inputYearExpiry, "Wrong format, number only");
            } else {
                successInput(inputYearExpiry);
            };
        };
    };

    if (selectedElement.id === "in-cardExpiryYear") {
        if (selectedElement.value.trim().length === 0) {
            errorMessageHandler(selectedElement, "Year can't be blank");
        } else if (!(numberPattern.test(selectedElement.value))) {
            errorMessageHandler(selectedElement, "Wrong format, number only");
        } 
        else {
            successInput(selectedElement);
            if (inputMonthExpiry.value.trim().length === 0) {
                errorMessageHandler(inputMonthExpiry, "Month can't be blank");
            } else if (!(numberPattern.test(inputMonthExpiry.value))) {
                errorMessageHandler(inputMonthExpiry, "Wrong format, number only");
            } else if (Number(inputMonthExpiry.value) <= 0 || Number(inputMonthExpiry.value) > 12) {
                errorMessageHandler(inputMonthExpiry, "Month must between 1-12");
            } else successInput(inputMonthExpiry);
        };
    };
    creditCardValidity(creditCard);
};

form.addEventListener("submit", function (event) {
    event.preventDefault();
    inputsContainer.classList.add("visually-hidden");
    thankyouSection.classList.remove("visually-hidden");
});

inputCardNumber.addEventListener("input", spaceFormat);
userInputs.forEach(input => input.addEventListener("blur", checkError));
