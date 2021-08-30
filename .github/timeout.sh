date
now=$(date)

echo "crawling news..."
node scrape.js
echo "crawling done..."
sleep 1s
echo "pushing to github..."
git add .
git commit -m "$now"
git push 



