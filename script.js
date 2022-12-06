const keys = document.getElementById("container");
const display1 = document.getElementById("displayElement--1");

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
    case "=":
      result = sumaFx(arr);
      break;
    default:
      result;
  }
  return result;
};

let operatorArr = [];
let lastClicked = "+";

const keyNumberFx = (key) => {
  preNumbers.push(key); // string no matter
  fullNumber = preNumbers.join("");
  display1.textContent = fullNumber;
  return fullNumber;
};
const keyOperatorFx = (key) => {
  arrayToOperate.push(+fullNumber);
  const resultOp = operatorFx(arrayToOperate, operatorArr);
  display1.textContent =
    resultOp.toString().length > 10 ? resultOp.toFixed(3) : resultOp;
  operatorArr.splice(0, 2, key);
  preNumbers.splice(-preNumbers.length);
  fullNumber = undefined;
  arrayToOperate.splice(0, 2, +resultOp);
};
const fullNumberCheckFx = () => {
  if (preNumbers.at(-1) === ".") {
    preNumbers.push(0);
    return preNumbers;
  }
};
const deleteFx = () => {
  preNumbers.pop();
  fullNumber = preNumbers.join("");
};
/// EVENTO CLICK
keys.addEventListener("click", (e) => {
  let keyClicked = e.target.textContent;
  debugger;

  let result;
  if (keyClicked === "C") {
    if (!isNaN(+lastClicked) && preNumbers.length !== 0) {
      deleteFx();
      display1.textContent = "0";
    } else {
      arrayToOperate.pop();
      display1.textContent = "0";
    }
  } else if (keyClicked === "√") {
    if (!isNaN(+lastClicked)) {
      arrayToOperate.push((+fullNumber) ** (1 / 2));
      display1.textContent = arrayToOperate.at(-1);
      preNumbers.splice(-preNumbers.length);
      fullNumber = 0;
      lastClicked = arrayToOperate.at(-1);
    } else {
      result = arrayToOperate[-1] ** (1 / 2);
      arrayToOperate.splice(-1, 1, result);
      display1.textContent = result;
    }
  } else if (keyClicked === "=") {
    keyClicked = "+";
    keyOperatorFx(keyClicked);
    lastClicked = keyClicked;
  } else {
    if (isNaN(+keyClicked) && keyClicked !== ".") {
      // keyClicked es string
      if (typeof lastClicked === "string" && lastClicked !== ".") {
        if (lastClicked === ".") fullNumberCheckFx();
        operatorArr.splice(-1, 1, keyClicked);
      } else {
        // ultimo click número
        operatorArr.push(keyClicked);
        keyOperatorFx(keyClicked);
      }
      lastClicked = keyClicked;
    } else if (keyClicked === ".") {
      fullNumber = keyNumberFx(keyClicked);
      lastClicked = ".";
    } else {
      // keyClicked es número
      fullNumber = keyNumberFx(+keyClicked);
      lastClicked = +keyClicked;
    }
  }
});
