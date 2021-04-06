const puppeteer = require('puppeteer');
var url = require('url');

(async () => {
    // let launchOptions = {headless: false};

    const browser = await puppeteer.launch({headless: false});

    const page = await browser.newPage();

    await page.setViewport({width: 1200, height: 800});
    
    await page.goto('https://www.1688.com/index.html');
    await page.click('.identity-cancel');
    await page.goto(`https://www.1688.com/index.html`);
    await page.click('span#sm-widget-picbtn.sm-widget-picbtn');

    await page.waitForSelector('input[type=file]');
    // await page.waitFor(1000);

    const inputUploadHandle = await page.$('input[type=file]');

    let fileToUpload = `마스크.png`;
    inputUploadHandle.uploadFile(fileToUpload);



    // const [response] = await Promise.all([
	// 	init(),
	// 	getUrl(),
	// ]);
	
	// async function init() {
	// 	await page.goto('https://www.1688.com/index.html');
	// 	await page.click('.identity-cancel');
	// 	await page.goto('https://www.1688.com/index.html');
	// 	await page.click('span#sm-widget-picbtn.sm-widget-picbtn');
	// 	await page.waitForSelector('input[type=file]');
	// 	const inputUploadHandle = await page.$('input[type=file]');
	// 	let fileToUpload = `마스크.png`;
	// 	inputUploadHandle.uploadFile(fileToUpload);
	// }

	// async function getUrl() {
	// 	console.log(page.url());
	// }
    

    // await page.waitForSelector('#upload');
    // await page.evaluate(() => document.getElementById('upload').click());

    // await page.waitForSelector('#upload-link');
    // await page.waitFor(5000);
    // console.log('upload');

    // let downloadUrl = await page.evaluate(() => {
    //     return document.getElementById('upload-link').value;
    // });

    // console.log(window.location.href());

    // if (typeof(window) !== 'undefined') {
    //     // code here
    //     console.log(window.location.href());
    // }
    // const cookie = page.cookies();
    // console.log(cookie[1]);
    setTimeout(function(){
        console.log(page.url());
    }, 5000);
    // await console.log(page.url());
    // console.log(typeof page.url());

    // const defaultOptions = await synthetics.getDefaultLaunchOptions();
    // let getUrl = synthetics.getPage();
    // await page.waitForNavigation(5);
    // console.log(page.content());
    // console.log(page.getPage());
    //
    // await Promise.all[
    //     page.goto('https://www.1688.com/index.html'),
    //     page.waitForNavigation(),
    //     page.click('.identity-cancel'),
    //     page.goto(`https://www.1688.com/index.html`),
    //     page.click('span#sm-widget-picbtn.sm-widget-picbtn'),
    //     page.waitForSelector('input[type=file]'),
    //     Uploader,
    //     page.waitForNavigation(),
    //     console.log(page.url())
    // ];
    
    // function Uploader() {
    //     var file = page.$('input[type=file]');
    //     file.uploadFile('마스크.png');
    // }

})();