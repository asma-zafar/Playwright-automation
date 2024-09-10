//Verify that login with other id and try to open the random order which is not present agaisnt this user and after that it shows an error message you are not authorized user
// Intercept the Request call and Response call
const { test, expect, request } = require('@playwright/test');
test('Security test request intercept ', async ({ page }) => {   //intercept request calls
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
