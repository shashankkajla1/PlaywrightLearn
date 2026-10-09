@memory
Feature: Cucumber memory
  Scenario: Store and resolve a scenario value
    When I store "test" as "Test"
    When I store "shared" as feature memory "FeatureValue"
    When I parse value "plain text"
    Then the parsed value should equal "plain text"
    When I parse value "$Test"
    Then the parsed value should equal "test"
    When I parse value "User: $Test / Feature: $FeatureValue"
    Then the parsed value should equal "User: test / Feature: shared"

  Scenario: Share a feature value and reset scenario values
    When I parse value "$FeatureValue"
    Then the parsed value should equal "shared"
    Then memory key "Test" should not exist
    Then parsing value "$Missing" should fail for missing key "Missing"