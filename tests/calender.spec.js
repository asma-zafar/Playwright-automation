import { test, expect } from '@playwright/test';
 
test('Calender Validation', async ({ page }) => {
  

//await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
const month= "9"
const date="15"
const year='2024'
const expectedlist=(month,date,year);
await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator(".react-date-picker__inputGroup").click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
await page.getByText(year).click();
await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
await page.locator("//abbr[text()='"+date+"']").click();
/*const input=await page.locator(".react-date-picker__inputGroup input");
for(let i=0; i<input.length ; i++)
{
    const value=input[i].getAttribute("value")
    expect(value).toEqual(expectedlist[i])


}*/
const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index <inputs.length; index++)
    {
        const value =inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }
 

})