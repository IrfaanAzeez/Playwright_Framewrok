Feature: Login to application
  @onlythis
  Scenario: Valid user logs in successfully
    Given I launch the browser
    When I navigate to the login page
    And I login with valid credentials from config
    #And I Create new Student account with needed details
    Then I should provide consent signature
    And I should fill the personal details