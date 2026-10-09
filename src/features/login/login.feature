Feature: Login functionality
    
    @current
    Scenario: User logs in with valid credentials
      Given The "standard_user" is logged in with valid credentials
      When the product "$$productNames.swat" is added to cart