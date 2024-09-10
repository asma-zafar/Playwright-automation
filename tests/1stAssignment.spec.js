const {test,expect}=require('@playwright/test');
const { register } = require('module');
test('1st Assignment',async ({page}) =>{
    /*const Register= page.locator("//a[normalize-space()='Register here']");
    const FirstName= page.locator("//input[@id='firstName']");
    const LastName= page.locator("//input[@id='lastName']");
    const Email= page.locator("//input[@id='userEmail']");
    const PhoneNo= page.locator("//input[@id='userMobile']");
    const Gender = page.locator("//input[@value='Female']");
    //const Occuption= page.locator("//select[@class='custom-select ng-pristine ng-valid ng-touched']");
    const Password1=page.locator("//input[@id='userPassword']");
    const ConfirmPassword= page.locator("//input[@id='confirmPassword']");
    const AgeConfirmation= page.locator("//input[@type='checkbox']");

    await page.goto('https://rahulshettyacademy.com/client');

    await Register.click;
    await page.waitForTimeout(5000);
    await page.goto('https://rahulshettyacademy.com/client/auth/register');
    await FirstName.fill('Asma');
    await LastName.fill('Zafar');
    await Email.fill('asma.zafar@devigital.com');
    await PhoneNo.fill('03066005916');
    await Gender.click();
    await page.selectOption("//option[@value='3: Engineer']");
    //await Occuption.click();
    //await page.selectOption('select#dropdown-id', 'option-value');
    await Engineer
    await Password1.fill('12345');
    await ConfirmPassword.fill('12345');
    await AgeConfirmation.check();*/
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("//input[@id='userEmail']").fill('asma.zafar381@gmail.com');
    await page.locator("//input[@id='userPassword']").fill('Sitronics@12345');
    await page.locator("//input[@id='login']").click();
    //await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    console.log(await page.locator('.card-body b').allTextContents());
    

})