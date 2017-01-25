# Run from root of project

webdriver-manager update
xvfb-run -s"-screen 0 1200x480x8" protractor functionalTests/conf.js
rm -rf .org.chromium.Chromium.*