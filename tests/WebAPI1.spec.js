const { test, expect, request } = require('@playwright/test');

const loginPayload = {
  userEmail: "asma.zafar381@gmail.com",
  userPassword: "Sitronics@12345"
};
const orderPayload = 
    {
        orders: [{country: "Pakistan", productOrderedId: "6581ca399fd99c85e8ee7f45"}]
    };
let token;
let orderId;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
    data: loginPayload
  });

  expect(loginResponse.ok()).toBeTruthy();

  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log('This is my API token response:', token);

  //Create Order
  const orderResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
  {
      data: orderPayload,
      headers: 
      {
          'Authorization': token,
          'Content-Type': 'application/json'

      },

  });
  const orderResposeJson= await orderResponse.json();
  console.log('this is my orderjson Response:', orderResposeJson);
  orderId=orderResposeJson.orders[0];

});

test('Place Order', async ({ page }) => {
  // Inject the token into the browser's local storage before the page is loaded
  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, token);


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
            if(orderId.includes(roworderid))
            {
                await rows.nth(i).locator("button").first().click();
                break;
            }


        }
        await page.locator(".col-text").waitFor();
        const orderiddetail=await page.locator(".col-text").textContent();
        await page.pause();
        expect(orderId.includes(orderiddetail)).toBeTruthy();
 
        await page.pause();







    })


