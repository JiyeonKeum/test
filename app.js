const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 80
const path = require('path')
const puppeteer = require('puppeteer');
const fs = require('fs');
const mysql_dbc = require('./database')(); 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var conn = mysql_dbc.init();
mysql_dbc.test_open(conn);

//랭크 저장
app.get('/api/top500/keyword', function(res, req){
    let itemList = [];
    async function extractItems(){
        let extractedElements = document.querySelectorAll('span.keyword-label');
        const items = [];

        for(let element of extractedElements){
            items.push(element.innerText);
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

        await page.goto('https://www.itemscout.io/category?c=9');
        itemList = await scrapeInfiniteScrollItems(page, extractItems, 10);

        // console.log(itemList);

        insertdb(itemList);

        await browser.close();
    })();

    function insertdb (itemList) {
        for(var i = 0; i < itemList.length; i++){
            conn.query(`insert into top500(ranking, keyword) value(${i + 1}, '${itemList[i]}');`, (err, rows, fields) => {
                if(!err){
                    console.log('success');
                }
                else{
                    console.log(err);
                }
            })
        }
    }
    
})

app.get('/api/top500/searchCount', function(res, req){
    let itemList = [];
    async function extractItems(){
        let extractedElements = document.querySelectorAll('td.table-td.text-right.its-column-4');
        const items = [];

        // const ranking = 0;
        for(let element of extractedElements){
            items.push(element.innerText);
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

        await page.goto('https://www.itemscout.io/category?c=9');
        itemList = await scrapeInfiniteScrollItems(page, extractItems, 10);

        // console.log(itemList);

        insertdb(itemList);

        await browser.close();
    })();

    function insertdb (itemList) {
        for(var i = 0; i < itemList.length; i++){
            conn.query(`update top500 set searchCount='${itemList[i]}' where ranking=${i + 1};`, (err, rows, fields) => {
                if(!err){
                    console.log('success');
                }
                else{
                    console.log(err);
                }
            })
        }
    }
    
})

app.get('/api/top500/itemCount', function(res, req){
    let itemList = [];
    async function extractItems(){
        let extractedElements = document.querySelectorAll('td.table-td.text-right.its-column-5');
        const items = [];

        // const ranking = 0;
        for(let element of extractedElements){
            items.push(element.innerText);
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

        await page.goto('https://www.itemscout.io/category?c=9');
        itemList = await scrapeInfiniteScrollItems(page, extractItems, 10);

        // console.log(itemList);

        insertdb(itemList);

        await browser.close();
    })();

    function insertdb (itemList) {
        for(var i = 0; i < itemList.length; i++){
            conn.query(`update top500 set itemCount='${itemList[i]}' where ranking=${i + 1};`, (err, rows, fields) => {
                if(!err){
                    console.log('success');
                }
                else{
                    console.log(err);
                }
            })
        }
    }
    
})

app.get('/api/top500/level', function(res, req){
    let itemList = [];
    async function extractItems(){
        let extractedElements = document.querySelectorAll('div.level-label');
        const items = [];

        // const ranking = 0;
        for(let element of extractedElements){
            items.push(element.innerText);
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

        await page.goto('https://www.itemscout.io/category?c=9');
        itemList = await scrapeInfiniteScrollItems(page, extractItems, 10);

        // console.log(itemList);

        insertdb(itemList);

        await browser.close();
    })();

    function insertdb (itemList) {
        for(var i = 0; i < itemList.length; i++){
            conn.query(`update top500 set level='${itemList[i]}' where ranking=${i + 1};`, (err, rows, fields) => {
                if(!err){
                    console.log('success');
                }
                else{
                    console.log(err);
                }
            })
        }
    }
    
})

// app.get('/api/top500', function(res, req){
//     conn.query(`select * from top500;`, (err, rows, fields) => {
//         if(!err){
//             console.log('hello');
//             res.send({result: true, data: fields});
//         }

//         else{
//             console.log(err);
//         }
//     })
// })

app.get('/api/top500', (req, res) => {
    conn.query(`select * from top500;`, (err, rows, fields) => {
        if(!err){
            console.log('hello world');
            res.send({result: true, data: rows});
        }
        if(err){
            console.log(err);
        }
    })
})


//키워드 네이버 쇼핑에서 검색결과 및 이미지, 가격 반환
app.get('/api/search/keyword', function(res, req){
    // const {keyword} = req.query;
    // console.log(keyword);
    let products = [];
    let productList = [];

    (async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        page.setViewport({width: 1280, height: 900});

        //#solution1
        // await page.goto('https://shopping.naver.com/home/p/index.nhn');
        
        // await page.$eval('input[name=query]', (el) => (el.value = 'test'));
        // await page.click('a.co_srh_btn');

        //#solution2
        await page.goto(`https://search.shopping.naver.com/search/all?query=마스크}`);
        
        let imageHref = await page.evaluate((sel) => {
            return document.querySelector(sel).getAttribute('src');
        }, '.basicList_item__2XT81 div.thumbnail_thumb_wrap__1pEkS._wrapper > a > img');

        let price = await page.evaluate((sel) => {
            return document.querySelector(sel).innerText;
        }, 'span.price_num__2WUXn');

        console.log(imageHref);
        console.log(price);

        var viewSource = await page.goto(imageHref);
        fs.writeFile("마스크.png", await viewSource.buffer(), function(err){
            if(err){
                return console.log(err);
            }
        });

        console.log('file saved');
    })();
    //C:\Users\Olivia\workspace\crawling\be\keyword.png
    //이미지 PC에 저장 그리고 PC에 저장된 경로 DB에 저장
    
    
    //db에 저장된 경로를 가져와서 알리바바 접속 후 이미지 검색 후 마진에 맞는 상품 추리기
    (async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        page.setViewport({width: 1280, height: 900});

        await page.goto(`https://www.1688.com/index.html`);

        await page.click('.identity-cancel');
        await page.goto(`https://www.1688.com/index.html`);
        await page.click('span#sm-widget-picbtn.sm-widget-picbtn');
        
        const inputUploadHandle = await page.$('input[type=file]');

        let fileToUpload = `마스크.png`;
        inputUploadHandle.uploadFile(fileToUpload);

    //검색 결과 url 가져오기 
    // console.log(page.cookies());
    let searchResult = "";

    setTimeout(function(){
        searchResult = page.url();
        // console.log(page.url());
    }, 5000);

    //검색결과 전체 상품 URL 가져오기
    async function extractItems(){
        let extractedElements = document.querySelectorAll(".common-offer-card > div > div > a");
        // const items = [];
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
        products = await scrapeInfiniteScrollItems(page, extractItems, 1000);

        console.log(items);
    })();


    //저장된 배열을 활용하여 페이지 방문 및 마진율에 맞는 값을 비교 

    for(let i = 0; i < items.length; i++){
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        page.setViewport({width: 1280, height: 926});

        await page.goto(items[i]);

        //.delivery-addr 배송지
        let delivery = document.querySelector('.delivery-addr').innerText;
        if('浙江省 金华市' === delivery){
            productList.push(items[i]);
        }
    }

    console.log(productList);
    
    })();

})

app.get('/api/navershopping', function(res, req){
    const {keyword} = req.query;
    console.log(req.query);
    
    (async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        page.setViewport({width: 1280, height: 900});

        await page.goto(`https://search.shopping.naver.com/search/all?query=${keyword}}`);

        let imageHref = await page.evaluate((sel) => {
            return document.querySelector(sel).getAttribute('src');
        }, '.basicList_item__2XT81 div.thumbnail_thumb_wrap__1pEkS._wrapper > a > img');

        let price = await page.evaluate((sel) => {
            return document.querySelector(sel).innerText;
        }, 'span.price_num__2WUXn');

        var viewSource = await page.goto(imageHref);
        fs.writeFile(`${keyword}.png`, await viewSource.buffer(), function(err){
            if(err){
                return console.log(err);
            }
        });
    })();

    res.send({result: true, imageHref: imageHref, price: price});
})

app.use(express.static('dist'));
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})