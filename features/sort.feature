Feature: Sort Products
  Scenario: Sort products by cheapest and most expensive
    Given I am on the Products page for sort test
    When I sort the products by cheapest then the products should be sorted in ascending order by price
    When I sort the products by most expensive then the products should be sorted in descending order by price