Feature: Test google authentication
  A user must be able to authenticate itself
  using google authenticator

  Scenario: A user logs in to the page using google auth
    Given I am on the homepage
    When I click on the "login" button
    Then the "login" ui element should appear
