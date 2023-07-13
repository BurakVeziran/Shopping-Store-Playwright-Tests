Feature: New User full end-to-end journey

  Scenario: User completes a full purchase journey
    Given I visit the products page
    And I sort products by cheapest
    And I add the first three products to the basket
    When I go to checkout
    And I remove the cheapest product
    And I continue to checkout
    And I move to signup
    And I sign up as a new user
    And I fill and save delivery details
    Then I activate discount
    And I fill card detail
    And I complete payment
