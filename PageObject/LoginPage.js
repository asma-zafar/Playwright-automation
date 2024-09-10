class LoginPage {
    constructor(page) {
        this.page=page;
        this.signInbutton = page.locator("[value='Login']");
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");

    }
    async goTo()
    {
        //now it will call on global level
        await this.page.goto("https://rahulshettyacademy.com/client")
    }
    async validLogin(email,password) {
        await this.email.fill(email);
        await this.password.fill("password");
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }

}
module.exports={LoginPage};

