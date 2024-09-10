const { test, expect } = require('@playwright/test');
    test('Dynamically Find Product', async ({ page }) => 
    {   
        const email='asma.zafar381@gmail.com';
        const ProductName='IPHONE 13 PRO';
        const products= page.locator('.card-body');
        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator("//input[@id='userEmail']").fill('asma.zafar381@gmail.com');
        await page.locator("//input[@id='userPassword']").fill('Sitronics@12345');
        await page.locator("//input[@id='login']").click();
        await page.waitForLoadState('networkidle');
        const Titles=await page.locator('.card-body b').allTextContents();
        console.log(Titles);
        //console.log('Products Name:'+products);
        const count=await products.count();
        console.log('Products count:'+count);
        for(let i=0; i< count; i++)

        {
            let Print=await products.nth(i).locator('b').textContent()
            //console.log(Print);
            //console.log('Hello Text')
            if (await products.nth(i).locator('b').textContent()==ProductName)
            {
                //Add Product to Cart it "Add to Cart"CTA works only when the product name match with the give product name
                await products.nth(i).locator('text= Add To Cart').click()
                break;

            }
        }
        await page.locator("//button[@routerlink='/dashboard/cart']").click();
        await page.locator("div li").first().waitFor();
        const bool=page.locator("h3:has-text('ProductName')").isVisible();
        expect(bool).toBeTruthy();
        await page.locator("//button[normalize-space()='Checkout']").click();
        await page.locator("//input[@placeholder='Select Country']").pressSequentially('ind');
        const dropdown=await page.locator(".ta-results")
        await dropdown.waitFor();
        const optionscount=await dropdown.locator("button").count();
        for(let i=1;i< optionscount;i++)
        {
            const text=await dropdown.locator("button").nth(i).textContent();
            if(text===" Indonesia") // if(text.trim()==="indonesia")   OR if(text.includes("indonesia"))
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }

        }
        expect(page.locator(".user__name [type='text']").first()).toHaveText('email');
        await page.locator("//a[normalize-space()='Place Order']").click();
        expect(page.locator(".hero-primary")).toHaveText(' Thankyou for the order. ');
        const orderID=await page.locator(".em-spacer-1 label").last().textContent();
        //console.log(orderID)
        await page.locator("label[routerlink='/dashboard/myorders']").click();
        await page.locator('tbody').waitFor();
        const rows=await page.locator('tbody tr');
        for(let i=0; i<rows.count(); i++)
        {
            const roworderid=await rows.nth(i).locator('th')
            if(orderID.includes(roworderid))
            {
                await rows.nth(i).locator("button").first().click();
                break;
            }


        }
        await page.locator(".col-text").waitFor();
        const orderiddetail=await page.locator(".col-text").textContent();
        expect(orderID.includes(orderiddetail)).toBeTruthy();
 
        await page.pause();







    })
  