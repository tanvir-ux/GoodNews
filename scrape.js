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
                }))
            );
        console.log(news);
        fs.writeFileSync('./news.json', JSON.stringify(news));      
        await browser.close();
    } catch (e) {
        console.log('our error', e)
    }
})()


