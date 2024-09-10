const { test, expect } = require('@playwright/test');
//const { LoginPage } = require('../PageObject/LoginPage.js');
const { POmanagers } = require('../PageObject/POmanagers.js');
//.parse conver the json file into javascript  //json->string->js object
const dataset = JSON.parse(JSON.stringify(require("../utils/ClientAppOPTestData.json")));
for (const data of dataset) {
    test(`@Web Client App login for ${data.productName}`, async ({ page }) => {
        const POmanager = new POmanagers(page);
        //js file- Login js, DashboardPage

        const products = page.locator(".card-body");
        const loginPage = POmanager.getLoginPage();

        await loginPage.goTo();
        await loginPage.validLogin(data.email, data.password);
        const dashboardPage = POmanager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        //await page.pause();

        await page.locator("div li").first().waitFor();
        const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
        expect(bool).toBeTruthy();
        await page.locator("text=Checkout").click();

        await page.locator("[placeholder*='Country']").pressSequentially("ind");

        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await dropdown.locator("button").nth(i).textContent();
            if (text === " India") {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

        expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
        await page.locator(".action__submit").click();
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);

        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = await page.locator("tbody tr");


        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();

    })
};
/*const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../PageObject/LoginPage.js');

test('@Web Client App login', async ({ page }) => {
    const email = "asma.zafar381@gmail.com";
    const password = "Sitronics@12345";
    const productName = 'IPHONE 13 PRO';

    const loginPage = new LoginPage(page);

    // Navigate to the login page and perform a valid login
    await loginPage.goTo();
    await loginPage.validLogin(email, password);

    // Wait until the network is idle
    await page.waitForLoadState('networkidle');

    // Wait for the product list to load
    await page.locator(".card-body b").first().waitFor();

    // Log all product titles
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    // Find and add the desired product to the cart
    const products = page.locator(".card-body");
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    // Proceed to checkout
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const isProductVisible = await page.locator(`h3:has-text('${productName}')`).isVisible();
    expect(isProductVisible).toBeTruthy();
    await page.locator("text=Checkout").click();

    // Select country in the checkout form
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    // Verify the email in the checkout summary
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();

    // Confirm the order
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    // Navigate to orders page and validate the order
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});*/
