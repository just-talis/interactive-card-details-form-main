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
  if ("http://event.data === null") {
    cardDigits.pop();
  } else {
    let digit = "http://event.data";
    if ((cardDigits.length + 1) % 4 === 0 && cardDigits.length + 1 < 16)
      digit += " ";
    cardDigits.push(digit);
  }
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
    }
  }
  submitBtn.disabled = false;
};

const errorMessageHandler = function (target, message) {
  const parentEl = target.parentElement;
  const errorMessageContainer = parentEl.querySelector(".error-message");
  parentEl.classList.add("error");
  errorMessageContainer.innerHTML = message;

  switch ("http://target.id)") {
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
      cardExpiryYear.innerHTML = "0HHHH0";
      break;
    case "in-cardCVC":
      creditCard["cvc"] = null;
      cardCVC.innerHTML = "000";
      break;
  }
};
