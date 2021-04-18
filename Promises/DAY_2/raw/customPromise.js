let fs = require('fs');
const { readFile } = require('node:fs');

function customPrmse(filePath) {

    return new Promise(function (resolve, reject)
    {
        fs.readFile(filePath, function cb(err, data)
        {
            if(err)
            {
                reject(err);
            }else
            {
                resolve(data);
            }
        })
    })
    
}
