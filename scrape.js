const puppeteer = require('puppeteer');
const fs = require('fs');

(async function main() {
    try {

        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();

        await page.goto('https://www.prothomalo.com/collection/latest');
        await page.setViewport({
            width: 1200,
            height: 800
        });

        await page.waitForSelector('.bn-story-card');

        // const data = await page.evaluate(() =>

        //     Array.from(document.querySelectorAll('.bn-story-card'))
        //         .map((el) => ({
        //             name: el.querySelector('a > h2').textContent,
        //             link: el.querySelector('a').href,
        //             image_link: el.querySelector('div.card-image-wrapper img').src
        //         }))
        // );

        const names = await page.evaluate(() =>

            Array.from(document.querySelectorAll('a > h2'))
                .map((el) => ({
                    name: el.textContent
                }))

        )

        const links = await page.evaluate(() =>

            Array.from(document.querySelectorAll('div.bn-story-card a'))
                .map((el) => ({
                    link: el.href
                }))

        )

        const image_links = await page.evaluate(() =>

            Array.from(document.querySelectorAll('div.card-image-wrapper img'))
                .map((el) => ({
                    image_link: el.src
                }))

        )

        const news = names.concat(links, image_links);


        console.log(news);

        fs.writeFileSync('./news.json', JSON.stringify(news));

        // now scrape the images        

        // const images = await page.evaluate(() => 



        // )

        await browser.close();


        // storiesSet.map((el) => ({
        //     title: el.innerText
        // }));

        // await page.waitForSelector('.N3ewq',{timeout:3000}).catch(() => console.log('Class N3ewq doesn\'t exist!'));
        // await page.evaluate(() => {
        //           if(document.querySelectorAll('#step_next').length > 0){
        //               Array.from(document.querySelectorAll( '.N3ewq')).filter(element => element.textContent == 'Switch' )[0].click();
        //           }


        // name 
        // link
        // image_link
        // news_category
        // news_bad_words[]
        // isGoodNew
        // source_name
        // source_home_link
        // news_language

        // stories.map(el => ({ title: el.childNodes[0].childNodes[0].querySelector('h2').innerText}))

        // stories.map(el => ({ title: el.childNodes[0]}))







    } catch (e) {
        console.log('our error', e)
    }
})()


