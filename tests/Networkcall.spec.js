const { test, expect, request } = require('@playwright/test');

const loginPayload = {
  userEmail: "asma.zafar381@gmail.com",
  userPassword: "Sitronics@12345"
};

const orderPayload = {
  orders: [{ country: "Pakistan", productOrderedId: "6581ca399fd99c85e8ee7f45" }]
};

const fakePayloadOrders = { data: [], message: "No Orders" };

let token;
let orderId;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  // Login and get token
  const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
    data: loginPayload
  });

  expect(loginResponse.ok()).toBeTruthy();

  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log('API Token:', token);

  // Create Order
  const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
    data: orderPayload,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  });


  const orderResponseJson = await orderResponse.json();
  console.log('Order JSON Response:', orderResponseJson);
  orderId = orderResponseJson.orders[0];
});

test('Place Order', async ({ page }) => {
  // Inject the token into local storage before page load
  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, token);

  // Navigate to the client page
  await page.goto('https://rahulshettyacademy.com/client');

  // Intercept and fake the order retrieval API response
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async (route) => {
    const response = await page.request.fetch(route.request());
    route.fulfill({
      response,
      //fake payloadorders data is in javascript format we need to change this in json thats why we use json.stringify it will change the data into json
      body: JSON.stringify(fakePayloadOrders),
    });
    // Intercepting response - fake response replaces actual API response
  });

  // Navigate to "My Orders" section
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator("//button[@routerlink='/dashboard/myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
  console.log('this is empty message of order page:', await page.locator(".mt-4").textContent());
  //await page.locator('tbody').waitFor();

  //const rows = await page.locator('tbody tr');

  // Additional logic to handle the rows can be added here
});
