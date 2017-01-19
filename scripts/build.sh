# Run from root of project

# Make build dir
mkdir -p build/tmp build/js

# Transform html templates to javascript
cd client/src/templates && ls *.html | xargs -i ng-html2js {} >> ../../../build/tmp/templates.js && cd -

# Browserify client code
browserify client/src/**/*.js -e client/src/app.js > build/tmp/client.js

# Cat files together
cat build/tmp/client.js build/tmp/templates.js > build/js/dist.js

# Remove temp dir
rm -rf build/tmp

# Copy files
cp -r public/* build
cp node_modules/bootstrap/dist/css/bootstrap.min.css node_modules/bootstrap/dist/css/bootstrap-theme.min.css build/css