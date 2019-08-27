Then I focus on the "searchInput" field and type "hello"
    Then I click the "search" button
    Then I click on the first "result" link
    Then I should see text "Adele - Hello"

Then('I click the {string} button', pressButton);
Then('I focus on the {string} field and type {string}', fillInFormField);
Then('I click on the first {string} link', clickOnLink);
Then('I should see text {string}', shouldSeeText);