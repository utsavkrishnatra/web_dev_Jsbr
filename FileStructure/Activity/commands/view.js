let fs = require("fs");
let p = require("path");

function viewFn(dirPath,mode) {
    if(mode =="tree")
    {
        viewTree(dirPath,"")
        // console.log("U printed tree!!");
    }
    
    else if (mode=="flat") {
        viewFlat(dirPath)
    // console.log("U printed flat!!");    
    }
else{
    console.log("Wrong Mode!!");
}
    
}

function isFileChecker(dirPath)
{
    return fs.lstatSync(dirPath).isFile();
}

function getContent(dirPath) {
    return fs.readdirSync(dirPath);
}



function viewFlat(dirPath)
{
    let isFile = isFileChecker(dirPath);
    if(isFile == true)
    {
        console.log(dirPath+"*");
    }
    else{
        //print the path
        console.log(dirPath);
        // get children
        let children = getContent(dirPath);

        for (let i = 0; i < children.length; i++) {
            let childPath = p.join(dirpath,children[i])
             viewFlat(childPath);
            
        }
    }
}


function viewTree(dirPath,indent)
{
    let isFile = isFileChecker(dirPath);
    if(isFile == true)
    {
        console.log(indent,p.basename(dirPath)+"*");
    }
    else{
        //print the path
        console.log(indent,p.basename(dirPath));
        // get children
        let children = getContent(dirPath);

        for (let i = 0; i < children.length; i++) {
            let childPath = p.join(dirPath,children[i]);
             viewTree(childPath,indent+"\t");
            
        }
    }
}

module.exports = {
    viewFn:viewFn
}