let puppeteer = require('puppeteer');

async function main () {
    let browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();
    await page.goto("http://corners.gmarket.co.kr/SuperDeals");

    let elementHandle = await page.$$("li.masonry-brick");
    for(let eh of elementHandle){
        let title = await eh.$eval('span.title', function(el){
            return el.innerText
        })

        console.log(title);
    }
    
    browser.close();
}

main();