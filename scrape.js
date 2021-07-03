const puppeteer = require('puppeteer');
const fs = require('fs');

(async function main() {
    try {        
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.goto('https://www.prothomalo.com/collection/latest');
        await page.waitForSelector('.bn-story-card');
        const news = await page.evaluate(() =>
            Array.from(document.querySelectorAll('.bn-story-card'))
                .map((el) => ({
                    name: el.querySelector('a > h2').textContent,
                    link: el.querySelector('a').href,
                    source_name: "Prthom Alo",
                    news_language: "Bangla"
                }))
            );
        console.log("without filter", news);         
        const news_bad_words = ["অবৈধ", "নির্যাতনের"]        
        await news.forEach(n => {                
                const names = n.name.split(' ');            
                for ( const x of names) {
                    for(const y of news_bad_words ) {
                        if( x === y) {
                            n.name = -1;
                        }
                    }
                }
            })
        console.log("with filter", news);               
        fs.writeFileSync('./news.json', JSON.stringify(news));      
        await browser.close();
    } catch (e) {
        console.log('our error', e)
    }
})()


