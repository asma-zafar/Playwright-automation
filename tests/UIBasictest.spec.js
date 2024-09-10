const {test,expect}=require('@playwright/test');
test.only('Browser Context First Playwright test',async ({browser}) =>
{
    //chrome - plugins /cookies
    const context=await browser.newContext();
    const page=await context.newPage();
    const Name=page.locator("#username");
    const Password= page.locator("#password");
    const SignIn = page.locator("#signInBtn");
    const ProductName=page.locator(".card-body a");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    console.log(await page.title());
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill('1234');
    await SignIn.click();
    //Text1=await page.locator("[style*='block']")
    const Text=await page.locator("[style*='block']").textContent();
    console.log(Text);
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await Password.fill("");
    await Password.fill("learning");
    await SignIn.click();
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
    const AllTitels=await ProductName.allTextContents();
    console.log(AllTitels);

});
test('Page Playwright test',async ({page}) =>
{
    
    await page.goto('https://www.google.com/');
    //get title
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');



})