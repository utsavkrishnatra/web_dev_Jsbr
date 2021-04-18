
let pptr = require('puppeteer');
const {codes} = require('./codes');
const { pw,id } = require('./secrets');

let gTab;
// browser launch

let browserLaunchPrmse =  pptr.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"]
})

browserLaunchPrmse.then(function(browser)
{
    let newtabPrmse =  browser.newPage();
    return newtabPrmse;
}).then(function(newTab)
{
    gTab=newTab;
    console.log("Page Opened!!");

    let pageOpenedPrmse =  newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    return pageOpenedPrmse;
}).then(function()
{
     let inputTypedPrmse =  gTab.type("#input-1",id,{delay:100});
     //waitAndClick()
     return inputTypedPrmse;
}).then(function()
{
     let PassTypedPrmse =  gTab.type("#input-2",pw,{delay:100});
     return PassTypedPrmse;
}).then(function()
{
    let LoginBtnPrsdPrmse = gTab.click("button[data-analytics='LoginPassword']",{delay: 20});
    return LoginBtnPrsdPrmse;
})
.then(function(){
    let ipKitwaitAndClickP = waitAndClick('a[id="base-card-1-link"]');
    return ipKitwaitAndClickP;
})
.then(function(){
   let wrmpWaitAndClickP = waitAndClick('a[data-attr1="warmup"]');
   return wrmpWaitAndClickP;
})
.then(function(){
    let UrlPromise = gTab.url();
    return UrlPromise;
})
.then(function(url){
    console.log(url);
    let code=codes[0];
    console.log(code.qName,code.qCode);

    let questionSolveP= questionSolver(url,code.qName,code.qCode);
    for(let i=0;i<codes.length;i++){
        questionSolveP=questionSolveP.then(function(){
            return questionSolver(url,codes[i].qName,codes[i].qCode);
        })
    }
    return questionSolveP;
})
.then(function(){
    console.log("All Questions Submitted!!");
})
.then(function(){
    let gTabCloseP= gTab.close();
    return gTabCloseP;
})
.then(function(){
    console.log("All Tabs Closed!!");
})
.catch(function(error)
{
    console.log(error);
})


function waitAndClick(selector)
{
    return new Promise(function(resolve,reject)
    {
        let waitKaPromise = gTab.waitForSelector(selector,{visible:true});
        waitKaPromise.then(function(){
         
            let clickPromise = gTab.click(selector);
            return clickPromise;
        })
        .then(function()
        {
            resolve();

        }).catch(function(error)
        {
            reject(error);
        })

    })
}

function questionSolver(url,qName,qCode)
{
    return new Promise(function(resolve,reject){

        // console.log("**********************");
        let gotoUrlPromise = gTab.goto(url);
        // console.log("**********************");
        gotoUrlPromise.then(function(){
         //find all h4 contents
         function RightQuesClicked(qName){

            console.log(qName);
            let allh4= document.querySelectorAll("h4");
            let QuesList =[]
            //console.log("***********************************************");
            for(let i=0;i<allh4.length;i++)
            {
                let qHeading=allh4[i].innerText.split("\n")[0];
                console.log(qHeading);
                
                QuesList.push(qHeading);
            }
          
           // console.log("**********************",qName);
            let QuesIndx=QuesList.indexOf(qName);
             //console.log(QuesIndx);
             allh4[QuesIndx].click();
            
         }
         
         let QuesEvaluateP= gTab.evaluate(RightQuesClicked,qName);
         return QuesEvaluateP;     
            
        })
        .then(function(){
            let ProblemTabVisibleP=gTab.waitForSelector('div[data-attr2="Problem"]',{visible:true});
            return ProblemTabVisibleP;
        })
        .then(function(){
            
            let CheckBoxClickedP=waitAndClick(".label-wrap .checkbox-input") ;
            return CheckBoxClickedP;
        })
        .then(function(){
            let TextAreaSelectedP= waitAndClick('textarea[class="input text-area custominput auto-width"]');
            return TextAreaSelectedP;
        }).then(function(){
            let CodeTyedinTextAreaP= gTab.type('textarea[class="input text-area custominput auto-width"]',qCode);
            return CodeTyedinTextAreaP;
        })
        .then(function(){
            let ctrlBtnPrsdP=gTab.keyboard.down("Control");
            return ctrlBtnPrsdP;
        })
        .then(function(){
            let AbtnPrsdP=gTab.keyboard.press("A");
            return AbtnPrsdP;
        })
        .then(function(){
            let CbtnPrsdP=gTab.keyboard.press("C");
            return CbtnPrsdP;
        })
        .then(function(){
            let AbtnPrsdP=gTab.keyboard.press("A");
            return AbtnPrsdP;
        })
        .then(function(){
            let TextAreaClickedP= gTab.click(".monaco-editor.no-user-select.vs");
            return TextAreaClickedP;
        })
        .then(function(){
            let AbtnPrsdP=gTab.keyboard.press("A");
            return AbtnPrsdP;
        })
        .then(function(){
            let VbtnPrsdP=gTab.keyboard.press("V");
            return VbtnPrsdP;
        })
        .then(function(){
            let ctrlBtnPrsdP=gTab.keyboard.up("Control");
            return ctrlBtnPrsdP;
        })
        .then(function(){
            let SubmitBtnClickedP=gTab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
            return SubmitBtnClickedP;
        })
         .then(function()
        {
            resolve();
        }).catch(function(){
            resolve();
        })

    })
}