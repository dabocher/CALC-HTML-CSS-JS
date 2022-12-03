const keys = document.getElementById("container");
const display1 = document.getElementById("displayElement--1");
const display2 = document.getElementById("displayElement--2");

let preNumbers = [];
let fullNumber;
let arrayToOperate = [0, "+"];
const sumaFx = (arr) => arr.reduce((acc, curr) => acc + curr);
const restaFx = (arr) => arr.reduce((acc, curr) => acc - curr, arr[0] * 2);
const multiFx = (arr) => arr.reduce((acc, curr) => acc * curr, 1);
const diviFx = (arr) => arr.reduce((acc, curr) => acc / curr, arr[0] ** 2);

// fx que opera
const operatorFx = (arr, operator) => {
  let result;
  switch (operator.at(-1)) {
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
  operatorArr.push(key);
  preNumbers = preNumbers.slice(preNumbers.length + 1);
  fullNumber = undefined;
  arrayToOperate = arrayToOperate.slice(arrayToOperate.length + 1);
  arrayToOperate.push(+resultOp);
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
      operatorArr.pop();
      operatorArr.push(keyClicked);
    } else {
      // ultimo click número
      operatorArr.push(keyClicked);
      keyOperatorFx(keyClicked);
    }
  } else {
    fullNumber = keyNumberFx(+keyClicked);
  }

  lastClicked = parseFloat(keyClicked);
});

/*   (typeof lastClicked === "number") {
    if (isNaN(+keyClicked) === "√") {
      arrayToOperate.push(+fullNumber);
      const resultOp = operatorFx(arrayToOperate, operatorArr);
      arrayToOperate.pop().push(resultOp);
    } else if (isNaN(+keyClicked) === "C") {
      preNumbers.pop();
    } else if (typeof +keyClicked === "number") {
      preNumbers.push(keyClicked);
      fullNumber = preNumbers.join("");
      //   display1.textContent = fullNumber;
      console.log(fullNumber, typeof fullNumber);
    } else if (isNaN(+keyClicked) && arrayToOperate.length < 2) {
      arrayToOperate.push(+fullNumber);
      operatorArr.push(keyClicked);
      preNumbers = preNumbers.slice(preNumbers.length + 1);
      fullNumber = undefined;
    } else {
      //   display1.textContent = "";
      //   // display2.textContent = `${fullNumber}${keyClicked}`;
      operatorArr.pop().push(keyClicked);

      arrayToOperate = arrayToOperate.slice(arrayToOperate.length + 1);
      arrayToOperate.push(+resultOp);
    }
    lastClicked = +keyClicked;
  } */
