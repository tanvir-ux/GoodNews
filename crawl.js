const puppeteer = require('puppeteer');

(async function main() {
    try {

        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();

        await page.goto('https://www.prothomalo.com/collection/latest');
        await page.waitForSelector('.stories-set');

        const data = await page.evaluate(() =>

            Array.from(document.querySelectorAll('.bn-story-card'))
                .map((el) => ({
                    title: el.innerText
                }))

            // storiesSet.map((el) => ({
            //     title: el.innerText
            // }));

            // stories.map(el => ({ title: el.childNodes[0].childNodes[0].querySelector('h2').innerText}))



        );

        console.log(data);

        await browser.close();


    } catch (e) {
        console.log('our error', e)
    }
})()


