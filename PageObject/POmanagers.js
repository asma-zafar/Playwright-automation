const {LoginPage}=require('./LoginPage');
const {DashboardPage}=require('./DashboredPage');
class POmanagers{
    constructor(page){
        this.page=page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage= new DashboardPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }
    getDashboardPage()
    {
        return this.dashboardPage;
    }
}
module.exports={POmanagers};