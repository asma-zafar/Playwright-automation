class APIUtils
{
    constructor(apiContext,loginPayload)
    {
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }
    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data: this.loginPayload
        }
        );
 // expect(loginResponse.ok()).toBeTruthy();

  const loginResponseJson = await loginResponse.json();
  const token = loginResponseJson.token;
  console.log('This is my API token response:', token);
  return token;
    }
    async createOrder(orderPayload)
    {
          //Create Order
          let response={};
          response.token=await this.getToken();
          const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
  {
      data: orderPayload,
      headers: 
      {
          'Authorization': response.token,
          'Content-Type': 'application/json'

      },

  });
  const orderResposeJson= await orderResponse.json();
  console.log('this is my orderjson Response:', orderResposeJson);
  const orderId=orderResposeJson.orders[0];
  response.orderId=orderId;
  return orderId;


    }

}
module.exports={APIUtils}

