Feature: Login to application
  @onlythis
  Scenario: Valid user logs in successfully
    Given I launch the browser
    When I navigate to the login page
    And I login with valid credentials from config
    #And I Create new Student account with needed details
    Then I should provide consent signature
    And I should fill the personal details
    Then I shoud fill the Residence details
    And I should add the criminal records
    Then I should add the Employment details
    And I should add the Eduction details
    Then I should add the License details
    Then I should sign the Authorization page
    And I should be able to schedule the Drug Test