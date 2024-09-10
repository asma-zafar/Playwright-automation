import { test, expect } from '@playwright/test';

test('Visual Testing', async ({ page }) => {
    await page.goto("https://www.flightaware.com/");
    
    // Take a screenshot and compare it with the saved snapshot
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('landing.png');
});
