/*const { When, Then, Given } = require('@cucumber/cucumber');
const { POmanagers } = require('../../PageObject/POmanagers.js');
const { test, expect,playwright } = require("@playwright/test");
const { verify } = require('crypto');
Given('a login to Ecommerce application with user {email} and {password}', async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    const browser=await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    this.POmanager = new POmanagers(page);
    //js file- Login js, DashboardPage

    const products = page.locator(".card-body");
    const loginPage = this.POmanager.getLoginPage();

    await loginPage.goTo();
    await loginPage.validLogin(data.email, data.password);
});

When('Enter calid details and Place the Order', async function () {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.POmanager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();
});

Then('Verify Order is present in the Order history page', async function () {
    // Write code here that turns the phrase above into concrete actions
    const cartPage=POmanager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();
});
*/

const { When, Then, Given, setDefaultTimeout } = require('@cucumber/cucumber');
const { POmanagers } = require('../../PageObject/POmanagers.js');
const { chromium } = require("@playwright/test");

setDefaultTimeout(30 * 1000); // Set timeout to 30 seconds

Given('a login to Ecommerce application with user {string} and {string}', async function (email, password) {
    const browser = await chromium.launch({ headless: false, slowMo: 100 });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    this.POmanager = new POmanagers(page);
    
    const loginPage = this.POmanager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, password);  // Use email and password from Cucumber parameters
});

When('Add {string} to cart', async function (productName) {
    const dashboardPage = this.POmanager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.POmanager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
});

When('Enter valid details and Place the Order', async function () {
    const cartPage = this.POmanager.getCartPage();
    await cartPage.Checkout();
});

Then('Verify Order is present in the Order history page', async function () {
    const orderHistoryPage = this.POmanager.getOrderHistoryPage();
    await orderHistoryPage.verifyOrderIsPresent();
});


