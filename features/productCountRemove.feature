Feature: Product Count Remove
  @smoke
  Scenario: Remove Product Count
    Given I am on the Products page to remove product
    When I remove the product count then the product count should decrease