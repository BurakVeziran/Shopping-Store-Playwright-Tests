Feature: Product Count
  Scenario: Add and Remove Product Count
    Given I am on the Products page to add product
    When I add the product count then the product count should increase


    Given I am on the Products page to remove product
    When I remove the product count then the product count should decrease

