const { test, expect, request } = require('@playwright/test');

const loginPayload = {
    form_type: "customer_login",
    utf8: "✓",
    "customer[email]": "asma@devigital.com",
    "customer[password]": "12345",
    return_url: "/account"
};
let token;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.get("https://www.bokksumarket.com/account/login", {
        data: loginPayload
    });

    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log('This is my API token response:', token);
})
test('Bokksu Market Login Test', async ({ page }) => {
    // Inject the token into the browser's local storage before the page is loaded
    await page.addInitScript((token) => {
        window.localStorage.setItem('token', token);
    }, token);
    await page.goto("https://www.bokksumarket.com/account/login?return_url=%2Faccount");
});
/*
const { test, expect, request } = require('@playwright/test');

const credentials = {
    email: "asma@devigital.com",
    password: "12345"
};

let token;

test.beforeAll(async () => {
    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post("https://portalapi.bokksu.com/customer-api-expanse-market.php?email=asma@devigital.com", {
        data: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(`Login Response Status: ${loginResponse.status()}`);
    console.log(`Login Response Headers: ${JSON.stringify(loginResponse.headers())}`);

    const contentType = loginResponse.headers()['content-type'] || '';
    let responseBody;
    if (contentType.includes('application/json')) {
        responseBody = await loginResponse.json();
        console.log('Parsed Login Response JSON:', responseBody);
    } else {
        responseBody = await loginResponse.text();
        console.error('Login Response is not JSON:', responseBody);
    }

    // Check if login was successful
    expect(loginResponse.ok()).toBe(true);

    token = responseBody.token; // Adjust based on the actual response
    if (token) {
        console.log('Token received:', token);
    } else {
        console.error('Token not found in the response.');
        throw new Error('Token not found in the response.');
    }
});

test('Fetch Payroll Data', async () => {
    if (!token) {
        console.error('Token is undefined. Test cannot proceed.');
        throw new Error('Token is undefined. Test cannot proceed.');
    }

    const apiContext = await request.newContext();

    const payrollResponse = await apiContext.get("https://www.bokksumarket.com/account/login?return_url=%2Faccount", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    console.log(`Payroll Response Status: ${payrollResponse.status()}`);
    console.log(`Payroll Response Headers: ${JSON.stringify(payrollResponse.headers())}`);

    const contentType = payrollResponse.headers()['content-type'] || '';
    let payrollData;

})*/