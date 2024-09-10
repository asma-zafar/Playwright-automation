import { test, expect } from '@playwright/test';
import { table } from 'console';

test('Table', async ({ page }) =>{
//open app URL
await page.goto('https://testautomationpractice.blogspot.com/');

const Table=await page.locator('#productTable');

// 1) Total no of rows and coloums
const coloums=await page.locator('thead tr th');
console.log('Number of coloums:', await coloums.count());

const rows=await page.locator('tbody tr');
console.log('Number of rows:', await rows.count());

expect(await coloums.count()).toBe(4);
expect(await rows.count()).toBe(13);

// 2) select checkbox
/*const matchedRow=rows.filter({
    has: page.locator('td'),
    hasText: 'Product 13'
})
matchedRow.locator('input').check();*/

// 3) select multile products by using re-usable function
/*await selectproduct(rows,page,'Product 1');
await selectproduct(rows,page,'Product 3');
await selectproduct(rows,page,'Product 5');*/

// 4) print all product detail using loop
/*for(let i=0; i<await rows.count();i++)
{
    const row=rows.nth(i);
    const tds=row.locator('td')
    for(let j=0; j<await tds.count()-1;j++)
    {
        console.log(await tds.nth(j).textContent())

    }
}*/

// 5) read data from all the pages
const pages=await page.locator('.pagination li a')
console.log('Number of pages in the table:', await pages.count())
for(let p=0; p<await pages.count(); p++)
{
    if(p>0)
    {
        await pages.nth(p).click()
    }
    for(let i=0; i<await rows.count();i++)
   {
       const row=rows.nth(i);
       const tds=row.locator('td')
       for(let j=0; j<await tds.count()-1;j++)
       {
           console.log(await tds.nth(j).textContent())
        }
    }
    await page.waitForTimeout(5000)

}

await page.waitForTimeout(5000);

});

/* async function selectproduct(rows, page, name)
{
    const matchedRow= rows.filter({
        has: page.locator('td'),
        hasText: name
    })
   await matchedRow.locator('input').check();
    
}*/