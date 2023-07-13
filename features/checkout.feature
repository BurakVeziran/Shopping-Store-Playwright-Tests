Feature: Checkout Page Total Prices
  @smoke
  Scenario: Verify Total Prices on Checkout Page
    Given I am on the Products page
    When I add a product to the cart
    Then I should see the total price on the Checkout page
