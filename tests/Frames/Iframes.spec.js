const { test,expect } = require('@playwright/test');
 
test('Frames/IFrames', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://playwright.dev/docs/test-assertions");
    //await page.goBack();
    //await page.goForward();
    await expect(page.locator("//input[@id='displayed-text']")).toBeVisible();
    await page.locator("//input[@id='hide-textbox']").click();
    await expect(page.locator("//input[@id='displayed-text']")).toBeHidden();
    //await page.pause();
    page.on("dialog", dialog => dialog.dismiss());
    await page.locator("//input[@id='confirmbtn']").click;
    await page.locator("//button[@id='mousehover']").hover();
    const framepage=page.frameLocator("#courses-iframe")
    await framepage.locator("li [href*='learning-path']:visible").click();
    const textcheck= await framepage.locator("div .content-side.col-xs-12 ").textContent();
    console.log(textcheck);
    //const textcheck=await framepage.locator(".text h2").textContent();
    //console.log(textcheck.split(" ")[1]);
    await page.pause();

   





})