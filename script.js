const keys = document.getElementById("container");
const display1 = document.getElementById("displayElement--1");
const display2 = document.getElementById("displayElement--2");

let preNumbers = [];
let fullNumber;
let arrayToOperate = [];
const sumaFx = (arr) => arr.reduce((acc, curr) => acc + curr);
const restaFx = (arr) => arr.reduce((acc, curr) => acc - curr, arr[0] * 2);
const multiFx = (arr) => arr.reduce((acc, curr) => acc * curr, 1);
const diviFx = (arr) => arr.reduce((acc, curr) => acc / curr, arr[0] ** 2);

// fx que opera
const operatorFx = (arr, operator) => {
  let result;
  // arr = arr.filter((elem) => typeof elem !== "string");
  switch (operator.at(0)) {
    case "+":
      result = sumaFx(arr);
      break;
    case "-":
      result = restaFx(arr);
      break;
    case "*":
      result = multiFx(arr);
      break;
    case "/":
      result = diviFx(arr);
      break;
    case "√":
      result = arr.at(-1) ** (1 / 2);
      break;
    default:
      console.log("0j0");
  }
  return result;
};

let operatorArr = [];
let lastClicked = "+";

const keyNumberFx = (key) => {
  preNumbers.push(key); // string no matter
  fullNumber = preNumbers.join("");
  return fullNumber;
};
const keyOperatorFx = (key) => {
  arrayToOperate.push(+fullNumber);
  const resultOp = operatorFx(arrayToOperate, operatorArr);
  operatorArr.splice(0, 2, key);
  preNumbers.splice(-preNumbers.length);
  fullNumber = undefined;
  arrayToOperate.splice(0, 2, +resultOp);
  // arrayToOperate.push(+resultOp);
};
const deleteFx = (arr) => arr.pop();

/// EVENTO CLICK
keys.addEventListener("click", (e) => {
  const keyClicked = e.target.textContent;
  debugger;
  let result;
  if (+keyClicked === "C") {
    result = deleteFx(operatorArr);
  } else if (+keyClicked === "√") {
    result = operatorFx(arrayToOperate, operatorArr);
  } else if (+keyClicked === "=") {
    result = operatorFx(arrayToOperate, operatorArr); //// CAMBIAR
  } else if (isNaN(+keyClicked)) {
    // is a string
    if (typeof lastClicked === "string") {
      operatorArr.splice(-1, 1, keyClicked);
    } else {
      // ultimo click número
      operatorArr.push(keyClicked);
      keyOperatorFx(keyClicked);
    }
  } else {
    fullNumber = keyNumberFx(+keyClicked);
  }
  !isNaN(+keyClicked)
    ? (lastClicked = +keyClicked)
    : (lastClicked = keyClicked);
});
