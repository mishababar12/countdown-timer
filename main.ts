import inquirer from "inquirer";
import chalk from "chalk";

import {differenceInSeconds} from"date-fns" ;

console.log(chalk.greenBright("+".repeat(65)))
console.log(chalk.black.bgCyanBright("\n\tWelcome to Mrs Babar - Countdown Timer\n"))
console.log(chalk.greenBright("+".repeat(65)))

const res = await inquirer.prompt([
    {
        type : "number",
        name : "userInput",
        message : chalk.black.yellowBright("Enter amount of second:"),
        validate : (input) => {
            if(isNaN(input)){
                return "Enter valid number"
            }
            else if(input > 60){
                return "Seconds must be in 60"
            }
            else{
                return true
                        }
        }
        }
]);
let input = res.userInput

function startTime(val:number){
    const iniTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(iniTime);
    setInterval((()=>{
        const currentTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime,currentTime);
        
        if(timeDiff <= 0){
            console.log(chalk.black.bgBlueBright("Timer has expired"));
            process.exit()
        }
        const min = Math.floor(timeDiff % (3600 * 24)/3600)
        const sec = Math.floor(timeDiff % 60)
        console.log(chalk.blue(
            `${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`))
    }),1000)
}

startTime(input)