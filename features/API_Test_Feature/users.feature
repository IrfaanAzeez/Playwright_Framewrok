Feature: DummyJson Users API CRUD Operations
  @apitest  
  Scenario: User CRUD Operations
    Given Navigate to DummyJson Users Endpoint
    When Get User Details
    And Create New User
    And Update the Details for Newly Created User
    And Delete the Newly Added User
    Then Verify all operations completed successfully