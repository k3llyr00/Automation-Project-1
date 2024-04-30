beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* + Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * + radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * + checkboxes, their content and links
    * + email format
 */

describe('Visual tests for registration form 3', () => {

    it('Radio button verification', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        
        //Check that radio buttons have expected content (version 1)
        cy.get('input[type="radio"]').then($radioButtons => {
            const actual = $radioButtons.toArray().map(radioButton => radioButton.value);
            expect(actual).to.deep.eq(['Daily', 'Weekly', 'Monthly', 'Never']);
        });

        // Verify labels of the radio buttons (version 2)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')

    });

    it('Checkboxes verification', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 2)

        // Verify labels of the radio buttons
        cy.get('.w3-cell-row').prev('div').should('have.text',
        '\n                Accept our privacy policy\n                \n                Accept our cookie policy\n                \n                    \n                \n            ')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','Accept our cookie policy')

        //Verify default state of radio buttons
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')

    });

    it('Email format', () => {
        // Attempting to enter an Invalid email
        cy.get('input[name="email"]').type('@email')
        cy.get('span[ng-show="myForm.email.$error.email"]').should('have.text', 'Invalid email address.').should('have.css', 'color', 'rgb(255, 0, 0)');
        // Attempting to enter an empty email
        cy.get('input[name="email"]').type(' ')
        cy.get('span[ng-show="myForm.email.$error.required"]').should('have.text', 'Email is required.').should('have.css', 'color', 'rgb(255, 0, 0)');

        // correct email
        cy.get('input[name="email"]').clear()
        cy.get('input[name="email"]').type('correct@email.com')
        cy.get('span[ng-show="myForm.email.$error.email"]').should('not.be.visible');
        cy.get('span[ng-show="myForm.email.$error.required"]').should('not.be.visible');


    });
})

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* + Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

describe.skip('Functional tests for registration form 3', () => {
    it('title', () => {
        // to-do
    });

    it('title', () => {
        // to-do
    });

    it('title', () => {
        // to-do
    });

    it('title', () => {
        // to-do
    });
})