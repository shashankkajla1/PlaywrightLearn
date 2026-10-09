Feature: API validation

  Scenario: Fetch a sample resource
    Given I have a valid api endpoint "https://jsonplaceholder.typicode.com/posts/1"
    When I send a GET request to the endpoint
    Then the response status should be 200
    And the response should contain a valid body
