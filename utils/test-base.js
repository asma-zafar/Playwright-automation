const { base } = require('@playwright/test');
exports.test=base.test.extend({
    testDataForOrder:{
        email: "asma.zafar381@gmail.com",
        password : "Sitronics@12345",
        productName : "IPHONE 13 PRO'"
    }

})