const { test, expect } = require('@playwright/test');
    test('UI CONTROLS', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

        const Name=page.locator("#username");
        const Password= page.locator("#password");
        const SignIn = page.locator("#signInBtn");
        const DropDown= page.locator('select.form-control');
        const BlinkingLocator=page.locator("//a[contains(text(),'Free Access to InterviewQues/ResumeAssistance/Mate')]");
        await DropDown.selectOption('consult');
        await page.locator(".checkmark").last().click();
        await page.locator(".btn.btn-success").click();
        await expect(await page.locator(".checkmark").last()).toBeChecked();
        console.log(await page.locator(".checkmark").last().isChecked());
        await page.locator("//input[@id='terms']").click();
        console.log(await page.locator("//input[@id='terms']").isChecked());
        await page.locator("//input[@id='terms']").uncheck();
        expect(await page.locator("//input[@id='terms']").isChecked()).toBeFalsy();

        //Assertion to check wheather the text is blinking or not 
        await expect(BlinkingLocator).toHaveAttribute("class","blinkingText")

        await page.pause();



    })