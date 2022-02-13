// dom references
const matchPin = document.getElementById("match-pin");
const pinTyped = document.getElementById("pin-typed");
const notifySuccess = document.getElementById("notify-success");
const notifyError = document.getElementById("notify-error");
var pin;

// generate pin
document.getElementById("generate-pin").addEventListener("click", () => {
  // get random pin of four digit
  pin = Math.floor(1000 + Math.random() * 9000);

  // set pin
  document.getElementById("pin-value").value = pin;

  // submit button should be active after pressing generating pin
  matchPin.removeAttribute("disabled");

  // Initial value for pin tried number
  pinTriedNum = 3;

  // Refresh check pin tried number
  checkPinTriedNum(pinTriedNum);
});

// keypad handler
document.getElementById("keypad").addEventListener("click", (e) => {
  let id, innerText;

  // Making sure button with number is clicked
  if (e.target.className === "button") {
    innerText = e.target.innerText;
    id = e.target.id;
  } else {
    return 0;
  }

  // clearing character by character
  if (id === "back") {
    pinTyped.value = pinTyped.value.slice(0, pinTyped.value.length - 1);
  } else if (id === "clear") {
    // clear all input character at a time
    pinTyped.value = "";
  } else {
    pinTyped.value += innerText;
  }
});

// Matching  PIN
matchPin.addEventListener("click", () => {
  const typedPin = pinTyped.value;

  // message showing based on pin entry
  if (String(pin) === typedPin) {
    notifySuccess.style.opacity = 1;
    notifyError.style.opacity = 0;
  } else {
    notifyError.style.opacity = 1;
    notifySuccess.style.opacity = 0;
  }

  // decrease pinTried number
  pinTriedNum--;
  checkPinTriedNum(pinTriedNum);
});

// Checking attempts of entering pin
function checkPinTriedNum(pinTriedNum) {
  if (pinTriedNum < 1) {
    matchPin.setAttribute("disabled", true);
  }

  document.querySelector(".action-left").innerText = ` ${
    pinTriedNum < 1 ? "No" : pinTriedNum
  } try left `;
}
