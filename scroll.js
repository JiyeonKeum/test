const fs = require('fs');
const puppeteer = require('puppeteer');

function extractItems() {
    const extractedElements = document.querySelectorAll('span.keyword-label');
    const items = [];
    for(let element of extractedElements) {
        items.push(element.innerText);
    }

    // let i = 0;
    //     extractedElements = document.querySelectorAll('td.table-td.text-right.its-column-4');
    //     for(let element of extractedElements){
    //         items[i]({
    //             ...items[i],
    //             searchCount: element.innerText
    //         })
    //         i++;
    //     }

    //     i = 0;
    //     extractedElements = document.querySelectorAll('td.table-td.text-right.its-column-5');
    //     for(let element of extractedElements){
    //         items[i]({
    //             ...items[i],
    //             itemCount: element.innerText
    //         })
    //         i++;
    //     }


    //     i = 0;
    //     extractedElements = document.querySelectorAll('div.level-label');
    //     for(let element of extractedElements){
    //         items[i]({
    //             ...items[i],
    //             level: element.innerText
    //         })
    //         i++;
    //     }

    return items;
}

async function scrapeInfiniteScrollItems(
    page,
    extractItems,
    itemTargetCount,
    scrollDelay = 1000,
) {
    let items = [];
    try {
        let previousHeight;
        while(items.length < itemTargetCount){
            items = await page.evaluate(extractItems);
            previousHeight = await page.evaluate('document.body.scrollHeight');
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
            await page.waitFor(scrollDelay);
        }
    } catch(e) {}

    return items;
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    page.setViewport({width: 1280, height: 926});

    await page.goto('https://www.itemscout.io/category?c=9');
    const items = await scrapeInfiniteScrollItems(page, extractItems, 100);

    console.log(items);

    await browser.close();
})();