"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const date_fns_1 = require("date-fns");
console.log(chalk_1.default.greenBright("+".repeat(65)));
console.log(chalk_1.default.black.bgCyanBright("\n\tWelcome to Mrs Babar - Countdown Timer\n"));
console.log(chalk_1.default.greenBright("+".repeat(65)));
const res = await inquirer_1.default.prompt([
    {
        type: "number",
        name: "userInput",
        message: chalk_1.default.black.yellowBright("Enter amount of second:"),
        validate: (input) => {
            if (isNaN(input)) {
                return "Enter valid number";
            }
            else if (input > 60) {
                return "Seconds must be in 60";
            }
            else {
                return true;
            }
        }
    }
]);
let input = res.userInput;
function startTime(val) {
    const iniTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(iniTime);
    setInterval((() => {
        const currentTime = new Date();
        const timeDiff = (0, date_fns_1.differenceInSeconds)(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk_1.default.black.bgBlueBright("Timer has expired"));
            process.exit();
        }
        const min = Math.floor(timeDiff % (3600 * 24) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(chalk_1.default.blue(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }), 1000);
}
startTime(input);
