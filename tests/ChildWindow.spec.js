const { test, expect } = require('@playwright/test');
    test('Child Window', async ({ browser }) => {
        const context=await browser.newContext();
        const page= await context.newPage();
        const Name=page.locator("#username");

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        const BlinkingLocator=page.locator("//a[contains(text(),'Free Access to InterviewQues/ResumeAssistance/Mate')]");

        const[newPage]=await Promise.all(
            [
                context.waitForEvent('page'), // Listen for new page
                BlinkingLocator.click(),  //New Page is opened
            ]) 
            const text = await newPage.locator(".red").textContent();
            const ArrayText=text.split('@')
            const Domain=ArrayText[1].split(' ')[0];
            //console.log(Domain);
            await Name.fill(Domain);
            await page.pause();
            console.log(await page.locator("#username").textContent());
            
        
    })