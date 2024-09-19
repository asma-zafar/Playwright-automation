Feature: Ecommerce validations

  Scenario: Placing the Order
  Given a login to Ecommerce application with user "asma.zafar381@gmail.com" and "Sitronics@12345"
    When Add "zara coat 3" to cart
    Then Verify "zara coat 3" is displayed in the cart
    When Enter calid details and Place the Order
    Then Verify Order is present in the Order history page