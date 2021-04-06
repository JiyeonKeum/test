const fs = require('fs');
const puppeteer = require('puppeteer');

let items = [];
let newItems = [];
async function extractItems(){
    let extractedElements = document.querySelectorAll(".common-offer-card > div > div > a");
    for(let element of extractedElements){
        items.push(element.getAttribute('href'));
    }

    return items;
}

async function scrapeInfiniteScrollItems(page, extractItems, itemTargetCount, scrollDelay = 1000){
    let items = [];
    try{
        let previousHeight;
        while(items.length < itemTargetCount){
            items = await page.evaluate(extractItems);
            previousHeight = await page.evaluate('document.body.scrollHeight');
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
            await page.waitFor(scrollDelay);
        }
    } catch(e){}

    return items;
}

(async () => {
    const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox']});

    const page = await browser.newPage();
    page.setViewport({width: 1280, height: 926});

    await page.goto('https://s.1688.com/youyuan/index.htm?tab=imageSearch&imageAddress=O1CN01F4XfEo1nhvJRBXpWB_!!2207654175122-2-1688search.png&spm=a260k.dacugeneral.search.0');
    const items = await scrapeInfiniteScrollItems(page, extractItems, 100);

    console.log(items);
})();

(async () => {
    for(let i = 0; i < items.length; i++){
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
    
        page.setViewport({width: 1280, height: 926});
    
        await page.goto(items[i]);
    
        //.delivery-addr 배송지
        let delivery = document.querySelector('.delivery-addr').innerText;
        if('浙江省 金华市' === delivery){
            newItems.push(items[i]);
        }
    }
    
    console.log(newItems);
})();


