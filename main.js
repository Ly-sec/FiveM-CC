import inquirer from "inquirer";
import chalk from "chalk";
import os from "os";
import fs from "fs";

const cacheArray = [];

const showMenu = () => {
    inquirer
    .prompt([{
        name: 'clearCache',
        type: 'list',
        message: 'Do you want to clear your FiveM cache?',
        choices: ['Yes', 'No'],
    },]
    ).then((answers) => {

        if(answers.clearCache === "Yes") {
            console.log(chalk.white.bold(`\nChecking if path exists [C:\\Users\\${os.hostname}\\AppData\\Local\\FiveM\\FiveM.app\\data]`))
            const dir = `C:\\Users\\${os.hostname}\\AppData\\Local\\FiveM\\FiveM.app\\data`
            cacheArray.push(
                `${dir}\\cache`,
                `${dir}\\server-cache`,
                `${dir}\\server-cache-priv`
            )
            
            if (fs.existsSync(dir)) {
                console.log(chalk.green.bold(`Directory found! \nClearing FiveM cache now.`))
                for (let i of cacheArray) {
                    fs.promises.rm(i, { maxRetries: 5, retryDelay: 2000, recursive: true, force: true })
                  }
                console.log(chalk.green.bold(`\nCleared your FiveM cache!`))
              } else {
                console.log(chalk.red.bold('Directory not found, please make sure to install FiveM in your AppData Directory.'))
              }
        }
    })
    .catch((err) => {
        console.log(err);
    });
}
showMenu();