# allure-tests
Repo to reproduce bugs in allure-hermione

### Installation:
1. `nvm install`
2. `npm install`
3. `npm run server:install`

### To reproduce https://github.com/allure-framework/allure-js/issues/708
1. `npm run server:start`
2. `npm test`

**There is specified chrome version in _servers scripts in package.json, because this version is used in our repos. But maybe latest version is still appliable, then you need to edit _server scripts.**
