Feature: The product store service

    Background:
        Given the following products
            | name    | description    | price | available | category |
            | Hat     | A red fedora   | 59.95 | True      | Cloths   |
            | Shoes   | Running shoes  | 89.99 | False     | Cloths   |
            | Big Mac | Fast food meal |  5.99 | True      | Food     |
            | Sheets  | Bed linens     | 29.99 | False     | Housewares |

    Scenario: Read a Product
        When I visit the "Home Page"
        And I set the "Name" to "Hat"
        And I press the "Search" button
        Then I should see the message "Success"
        When I copy the "Id" field
        And I press the "Clear" button
        Then the "Id" field should be empty
        And the "Name" field should be empty
        And the "Category" field should be empty
        When I paste the "Id" field
        And I press the "Retrieve" button
        Then I should see the message "Success"
        And I should see "Hat" in the "Name" field
        And I should see "A red fedora" in the "Description" field
        And I should see "59.95" in the "Price" field
        And I should see "True" in the "Available" dropdown
        And I should see "Cloths" in the "Category" dropdown

    Scenario: Update a Product
        When I visit the "Home Page"
        And I set the "Name" to "Hat"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "Hat" in the "Name" field
        When I change "Name" to "Fedora"
        And I press the "Update" button
        Then I should see the message "Success"
        When I copy the "Id" field
        And I press the "Clear" button
        And I paste the "Id" field
        And I press the "Retrieve" button
        Then I should see the message "Success"
        And I should see "Fedora" in the "Name" field
        When I press the "Clear" button
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "Fedora" in the results
        And I should not see "Hat" in the results

    Scenario: Delete a Product
        When I visit the "Home Page"
        And I set the "Name" to "Hat"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "A red fedora" in the "Description" field
        When I copy the "Id" field
        And I press the "Clear" button
        And I paste the "Id" field
        And I press the "Delete" button
        Then I should see the message "Product has been Deleted!"
        When I press the "Clear" button
        And I press the "Search" button
        Then I should see the message "Success"
        And I should not see "Hat" in the results

    Scenario: List all Products
        When I visit the "Home Page"
        And I press the "Clear" button
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "Hat" in the results
        And I should see "Shoes" in the results
        And I should see "Big Mac" in the results
        And I should see "Sheets" in the results

    Scenario: Search by Category
        When I visit the "Home Page"
        And I press the "Clear" button
        And I select "Food" in the "Category" dropdown
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "Big Mac" in the results
        And I should not see "Hat" in the results
        And I should not see "Shoes" in the results
        And I should not see "Sheets" in the results

    Scenario: Search by Availability
        When I visit the "Home Page"
        And I press the "Clear" button
        And I select "True" in the "Available" dropdown
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "Hat" in the results
        And I should not see "Shoes" in the results

    Scenario: Search by Name
        When I visit the "Home Page"
        And I press the "Clear" button
        And I set the "Name" to "Hat"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "Hat" in the "Name" field
        And I should see "A red fedora" in the "Description" field
