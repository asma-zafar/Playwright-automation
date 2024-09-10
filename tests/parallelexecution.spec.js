import { test, expect } from '@playwright/test';
test.describe.configure({mode: 'serial'})
test('@web Visual Testing', async ({ page }) => {
    await page.goto("https://www.flightaware.com/");
    
    // Take a screenshot and compare it with the saved snapshot
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('landing.png');
});
test('secreenshot and visual comparison', async ({ page }) => {
    await page.goto("https://www.flightaware.com/");
    
    // Take a screenshot and compare it with the saved snapshot
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('landing.png');
});
test('@web popup validation', async ({ page }) => {
    await page.goto("https://www.flightaware.com/");
    
    // Take a screenshot and compare it with the saved snapshot
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('landing.png');
});