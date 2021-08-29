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
        const news_bad_words = ["নিহত","মৃত্যু","ধর্ষণ","ধর্ষিত","ডাকাতি","গলাকাটা","লাশ","অর্ধগলিত","মাথার খুলি","খণ্ডিত লাশ","অস্ত্র","দগ্ধ","নিহত","মামলা","রিমান্ড","রিমান্ডে","নিহত","গ্রেপ্তার","জঙ্গি","আসামি","হুমকি","সন্ত্রাসী","সশস্ত্র","অস্ত্রধারী","অস্ত্র","সংঘর্ষ","দুর্ঘটনা","আঘাত","আহত","ছিনতাই","ছুরি","ছুরিকাঘাত","বিচ্ছেদ","বিরুদ্ধে","কারাগার","কারাগারে","আগুন","হয়রানি","করোনা পজিটিভ","আক্রান্ত","চোরাই","দুর্ঘটনায়","ট্রাকচাপায়","ঝগড়া","উদ্ধার","আটক","গণধর্ষন", "দুর্গন্ধ","দুর্ভোগ","মাদক","মাদকাসক্ত","গুলি","চাপাতি","ভয়ংকর","ধর্ষণের","সংঘাতে","বিপদে","অসহায়","অসুস্থ","দুঃসময়","এসিড","অ্যাসিড","ঝলসে","হত্যা","বিস্ফোরণ","বিস্ফোরক","হাহাকার"]
        
        await news.forEach(n => {                
                const names = n.name.split(' ');            
                for ( const x of names) {
                    for(const y of news_bad_words ) {
                        if( x === y) {
                            n.name = false;
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


