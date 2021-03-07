
let fs = require("fs");
const { types } = require("./utils");
let path= require("path");
let srcFolderToOrganize = "E:\\PepCoding Placement Program(15 Jan 2021)\\Web_Dev_JasBir\\codes\\FileStructure\\Facts\\exportsPractice";
let organizedFolder= path.join(srcFolderToOrganize, 'organized')
// "E:\\PepCoding Placement Program(15 Jan 2021)\\Web_Dev_JasBir\\codes\\FileStructure\\Facts\\D10" 

function orgFiles(dirPath)
{
    let isFile = isFileChecker(dirPath);
    if(isFile == true)
    {
       
       let destFolderName = getFolderName(dirPath);
       let destFolder = path.join(organizedFolder,destFolderName);
       // console.log(dirPath,"->",destFolderName);
       copyFileToFolder(dirPath,destFolder);
       //let destFolderPath= path.join(dirPath,destFolderName);
       //console.log(destFolderPath);
    }
    else{
        
     
        // get children
        let children = getContent(dirPath);

        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(dirPath,children[i])
            orgFiles(childPath);
            
        }
    }
}

function isFileChecker(dirPath)
{
    return fs.lstatSync(dirPath).isFile();
}

function getContent(dirPath) {
    return fs.readdirSync(dirPath);
}


function makeOrgFldr(dirName)
{
    let fldr =path.join(dirName, 'organized')
    if(!fs.existsSync(fldr))
        fs.mkdirSync(fldr); 
   
    //let element;    
    for (key in types) {
         //console.log(key);
        let subfldr= path.join(fldr,key)
        if(!fs.existsSync(subfldr))
        {
            fs.mkdirSync(subfldr);
        }
            
        
    }
}
function getFolderName(filePath) {

  // we can also use path.ext() name

    let FilePathArr= filePath.split(".");
    let extn =  FilePathArr.pop();
    //let files = getContent(filePath);
    for(key in types)
    {
        for(let i=0;i<types[key].length;i++)
        {
            if(types[key][i] == extn)
            {
               // console.log(file);
               return key;
            }
        }
    }
    return "others";
         
}


function getContent(dirPath) {
    return fs.readdirSync(dirPath);
}

function copyFileToFolder(dirPath,destFolder) {
    let fileName= path.basename(dirPath);
    let destFilePath=path.join(destFolder,fileName);
    fs.copyFileSync(dirPath, destFilePath);
}

makeOrgFldr(srcFolderToOrganize);

orgFiles(srcFolderToOrganize);