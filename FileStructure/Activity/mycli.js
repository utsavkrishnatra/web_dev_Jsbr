const { helpFn } = require("./commands/help");
const { organizeFn } = require("./commands/organize");
const { viewFn } = require("./commands/view");

let input = process.argv.slice(2);

let cmd = input[0];


switch (cmd) {
    case "view":
       viewFn(input[1],input[2]);
        break;
    case "organize":
        organizeFn(input[1]);
        break;
    case "help":
        helpFn();
        break;   
    default:
        console.log("Wrong function, enter help to see list of all commands!!");
        break;
}

