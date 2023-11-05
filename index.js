import inquirer from "inquirer";

const questions = [
  {
    type: "input",
    name: "firstName",
    message: "What is your name?",
  },
  {
    type: "confirm",
    name: "askAgain",
    message: "Continue (just hit enter for YES)?",
    default: true,
  },
];
const userData = [];
const winnerNumbers = [];
const kitty = 200;
function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}
function purchase(firstName) {
  console.log("firstName", firstName);
  let numberExist = false;
  do {
    let number = Math.floor(Math.random() * 50) + 1;
    numberExist = userData.some((data) => data["number"] === number);

    if (!numberExist) {
      userData.push({ firstName, number });
      console.log("userData", { firstName, number });
      // console.log("userData", userData);
    }
  } while (numberExist);
}
function draw() {
  while (winnerNumbers.length < 3) {
    const choosenNumber = getRandomNumber(50);
    if (!winnerNumbers.includes(choosenNumber)) {
      winnerNumbers.push(choosenNumber);
    }
  }
}
function winners(kitty) {
  const [winnerNumber1, winnerNumber2, winnerNumber3] = winnerNumbers;

  console.log("CodeCraft Challenge Results");
  console.log("1st ball: [ Ball " + winnerNumber1 + " ]");
  console.log("1st ball: [ Ball " + winnerNumber2 + " ]");
  console.log("1st ball: [ Ball " + winnerNumber3 + " ]");

  const findWinner = (number) =>
    userData.find((player) => player.number === number);

  const winner1 = findWinner(winnerNumber1);
  const winner2 = findWinner(winnerNumber2);
  const winner3 = findWinner(winnerNumber3);

  const calculatePrize = (percent) => Math.round((percent * kitty) / 2);

  console.log("Winners:");
  console.log(` [${winner1.firstName} 1 ] : [ ${calculatePrize(0.75)} ]`);
  console.log(` [${winner2.firstName} 2 ] : [ ${calculatePrize(0.15)} ]`);
  console.log(` [${winner3.firstName} 3 ] : [ ${calculatePrize(0.1)} ]`);
  userData = [];
}

function start() {
  inquirer
    .prompt(questions)
    .then((answer) => {
      purchase(answer.firstName);
      if (answer.askAgain) {
        start();
      } else {
        draw();
        winners(kitty);
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

start();
