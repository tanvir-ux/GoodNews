date
now=$(date)

echo "crawling news..."
node scrape.js
echo "crawling done..."
sleep 1s
echo "pushing to github..."
git config user.email "tanviralamshuvo@gmail.com"
git config user.name "tanvir-ux"
git add .
git commit -m "$now"
git push origin HEAD:main



