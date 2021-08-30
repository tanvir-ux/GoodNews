date
now=$(date)

echo "crawling news..."
node scrape.js
echo "crawling done..."
echo "pushing to github..."
git add news.json
git commit -m "$now"
git push 



