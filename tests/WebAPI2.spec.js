const { test, expect, request } = require('@playwright/test');
const {APIUtils}=require('./utils/APIUtils.js');
const loginPayload=
{
    userEmail: "asma.zafar381@gmail.com", userPassword: "Sitronics@12345"
}
const orderPayload=
{
    orders: [{country: "Japan", productOrderedId: "6581ca399fd99c85e8ee7f45"}]
}
let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils=new APIUtils(apiContext,loginPayload);
  response=await apiUtils.createOrder(orderPayload)
  

});

test('Place Order', async ({ page }) => {
   
  // Inject the token into the browser's local storage before the page is loaded
  
  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, response.token);


  // Navigate to the desired page
  await page.goto('https://rahulshettyacademy.com/client');

  // Further actions to place an order can be added here

        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator("label[routerlink='/dashboard/myorders']").click();
        await page.locator('tbody').waitFor();
        const rows=await page.locator('tbody tr');
        for(let i=0; i<rows.count(); i++)
        {
            const roworderid=await rows.nth(i).locator('th')
            if(response.orderId.includes(roworderid))
            {
                await rows.nth(i).locator("button").first().click();
                break;
            }


        }
        await page.locator(".col-text").waitFor();
        const orderiddetail=await page.locator(".col-text").textContent();
        await page.pause();
        expect(response.orderId.includes(orderiddetail)).toBeTruthy();
 
        await page.pause();







    })


