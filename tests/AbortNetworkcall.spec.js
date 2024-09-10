//Block the network calls
const { test, expect, request } = require('@playwright/test');
test('Abort Network Call ', async ({ browser }) => {   //Abort Network calls
    const context = await browser.newContext();
    const page = await context.newPage();
    // Block CSS files and jpg and png images from loading
    //await page.route('**/*.{css,jpg,png}', route => route.abort());
    
    // Log request URLs
    page.on('request', request => {
        console.log('Request URL:', request.url());
    });

    // Log response status for each request
    page.on('response', response => {
        console.log('Response Status:', response.status(), 'For URL:', response.url());
    });
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("//input[@id='userEmail']").fill('asma.zafar381@gmail.com');
    await page.locator("//input[@id='userPassword']").fill('Sitronics@12345');
    await page.locator("//input[@id='login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f6765b6' }))
    await page.locator("button:has-text('view')").last().click();
    await expect(page.locator(".blink_me").last()).toHaveText("You are not authorize to view this order");
    await page.pause();    //should show the message

})
