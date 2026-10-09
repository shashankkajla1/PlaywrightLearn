Feature: Accessibility checks

  Scenario: The login page should be accessible
    Given I open the homepage for accessibility testing
    Then the page should have no critical accessibility violations
