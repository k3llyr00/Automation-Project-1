// Before each test (it...) open .html page
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

/*
Assignment 2:

 1. Update the name of test suite by adding you name: “This is first test suite, John Smith”
 2. Replace text ‘Password123’ in the first test with your own chosen password (2 places) - passwords should match
 3. Change phone number in the first test to 555666777
 4. Change the order of steps in the first test:
      -first set phone number
      -then 2 password fields
      -then username
 5. Add comment to the first test containing today’s date
 */

describe('This is the first test suite, Kelly Roo', () => {
    it('User can submit data only when valid mandatory values are added', () => {
        //Today's date is 23-Apr-24.
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#firstName').type('Mari')
        cy.get('#lastName').type('Maasikas')
        cy.get('input[name="password"]').type('UpdatedPassword123')
        cy.get('[name="confirm"]').type('UpdatedPassword123')
        cy.get('#username').type('Something')

        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled').click()

        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('#success_message').should('be.visible').and('have.css', 'display', 'block')
    })


    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password123123').type('{enter}')

        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.get('#success_message').should('not.be.visible')
        cy.get('.submit_button').should('be.disabled')
        cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')
    })

    it('User cannot submit data when username is absent', () => {
        cy.get('#username').type('JohnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get("input[name='password']").type('Password123')
        cy.get('[name="confirm"]').type('Password123')
        // Scroll back to username input field and clear it
        cy.get('#username').scrollIntoView().clear()
        cy.get('h2').contains('Password').click()

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')
        cy.get('#input_error_message').should('be.visible').and('have.css', 'display', 'block')
    })

    /*
    Assignment 3: add the content to the following tests
    */

    it('User cannot submit data when phone number is absent', () => {
        cy.get('#firstName').type('Mari')
        cy.get('#lastName').type('Maasikas')
        cy.get('input[name="password"]').type('UpdatedPassword123')
        cy.get('[name="confirm"]').type('UpdatedPassword123')
        cy.get('#username').type('Something')

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    })

    it('User cannot submit data when password and/or confirmation password is absent', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#username').type('Something')
 
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    })

    it('User cannot add letters to phone number', () => {
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')
        cy.get('[data-testid="phoneNumberTestId"]').type('Cerebrum Hub')
        cy.get('#firstName').type('Mari')
        cy.get('#lastName').type('Maasikas')
        cy.get('input[name="password"]').type('UpdatedPassword123')
        cy.get('[name="confirm"]').type('UpdatedPassword123')
        cy.get('#username').type('Something')

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    })
})