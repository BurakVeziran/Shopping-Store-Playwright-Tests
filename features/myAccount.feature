Feature: My Account using cookie injection and mocking network
  Scenario: User tries to access My Account with a mocked network error
    Given I have a valid login token
    And I mock the user API to return a 500 error
    When I visit the My Account page
    Then I should see the page heading
    And I should see an error message
