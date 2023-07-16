Feature: Product Count Add
  @smoke
  Scenario: Add Product Count
    Given I am on the Products page to add product
    When I add the product count then the product count should increase