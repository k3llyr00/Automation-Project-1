const { faker } = require('@faker-js/faker')

// Declaring variables
const username = faker.internet.userName()
const email = faker.internet.email()
const firstName = faker.person.firstName()
const lastName = faker.person.lastName()
const phoneNumber = faker.number.int({ min: 0, max: 9999999999 })
let password = faker.internet.password()


beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Steps for filling in only mandatory fields
        cy.get('#username').type(username)
        cy.get('#email').type(email)
        cy.get('[name="name"]').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(phoneNumber)
        cy.get( '#cars' ).select( 'Audi' ); // optional step, because this field is already filled
        cy.get( '#animal' ).select( 'Snake' ); // optional step, because this field is already filled
        cy.get('input[name="password"]').type(password)
        // Type confirmation password which is different from first password
        cy.get('[name="confirm"]').type('NotRandomPassword')
        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')
        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')
        // Assert that error message is visible
        cy.contains('Password section').click();
        cy.get('#password_error_message').should('be.visible')
        // Change the test, so the passwords would match
        cy.get('[name="confirm"]').clear()
        cy.get('[name="confirm"]').type(password)
        cy.contains('Password section').click()
        // Add assertion, that error message is not visible anymore
        cy.get('#password_error_message').should('not.be.visible')
        // Add assertion, that submit button is now enabled
        cy.get('.submit_button').should('be.enabled')
    })
    
    it.only('User can submit form with all fields added', ()=>{
        //Steps for filling in all fields
        cy.get('#username').type(username)
        cy.get('#email').type(email)
        cy.get('[name="name"]').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(phoneNumber)
        cy.get('#phpFavLanguage').check()
        cy.get('#vehicle2').check()
        cy.get( '#cars' ).select( 'Audi' ) // optional step, because this field is already filled
        cy.get( '#animal' ).select( 'Snake' ) // optional step, because this field is already filled
        cy.get('input[name="password"]').type(password)
        cy.get('[name="confirm"]').type(password)
        // Assert that submit button is enabled
        cy.contains('Password section').click()
        cy.get('.submit_button').should('be.enabled')
        // Assert that after submitting the form system show successful message
        cy.get('.submit_button').click()
        cy.contains('#success_message', 'User successfully submitted registration').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        //Calling the function for filling in all mandatory fields
        inputValidData()
        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')
        // Assert that after submitting the form system shows successful message
        cy.get('.submit_button').click()
        cy.contains('#success_message', 'User successfully submitted registration').should('be.visible')
    })

    //VERSION 1 for 'the submit button is not enabled when some mandatory field is not present'
    it('Users cannot submit the registration form if a mandatory field is filled and then removed.', () => {
        //Calling the function for filling in all mandatory fields
        inputValidData()
        //Clear one mandatory field
        cy.get('#email').clear()
        // Attempt to click on submit button
        cy.get('.submit_button').click()
        // Add assertion, that error message is not visible and submit button is now disabled
        cy.get('#input_error_message').should('be.visible')
        cy.get('.submit_button').should('be.disabled')

    });

    //VERSION 2 for 'the submit button is not enabled when some mandatory field is not present'
    it('Users cannot submit the registration form if a mandatory field is missing', () => {
        //Filling mandatory fields except email 
        cy.get('#username').type(username)
        cy.get('[name="name"]').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(phoneNumber)
        cy.get('input[name="password"]').type(password)
        cy.get('[name="confirm"]').type(password)
        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')
    });

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that Cerebrum Hub logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('#logo').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height it should be less than 178 and greater than 100
        cy.get('#logo').invoke('height').should('be.lessThan', 178).and('be.greaterThan', 100)   
        // get element and check its parameter width it should be less than 177 and greater than 179
        cy.get('#logo').invoke('width').should('be.gte', 177).and('be.lte', 179)
    })

    it('Check that Cypress logo is correct and has correct size', () => {
        // Create similar test for checking the second picture
        cy.log('Will check second logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height it should be less than 89 and greater than 87
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.gte', 87).and('be.lte', 89)
        // get element and check its parameter width it should be less than 117 and greater than 115
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('be.gte', 115).and('be.lte', 117)

    });

    it('Check navigation for first link', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back').url().should('contain', '/registration_form_2.html');
        cy.log('Back again in registration form 2')
    })

    it('Check navigation for second link:', () => {
        // Get navigation element, find its second child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')

        // Check that the title (h1) contains Registration page
        cy.get('div>h1').should('contains.text', 'Registration page')
        
        // Go back to previous page
        cy.go('back').url().should('contain', '/registration_form_2.html');
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox button list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)

        // Verify labels of the radio buttons
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')

        //Verify default state of radio buttons
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        // Selecting one will not remove selection from the other checkbox button
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    })

    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Favourite animal dropdown is correct', () => {
        // Create screenshot from the code: select third element and create screenshot for this area or full page
        cy.get('#animal').select(2).screenshot('Animal drop-down, third value')
        cy.screenshot('Full page screenshot')

        // Get the length of array of elements in Cars dropdown
        cy.get('#animal').children().should('have.length', 6)

        // Check  that first element in the dropdown has text Volvo
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.text)
            expect(actual).to.deep.eq(['Dog', 'Cat', 'Snake', 'Hippo', 'Cow', 'Horse'])
        })
    })

})


function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type(email)
    cy.get('[data-cy="name"]').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('[data-testid="phoneNumberTestId"]').type(phoneNumber)
    cy.get('#password').type(password)
    cy.get('#confirm').type(password)
    cy.contains('Password section').click();
}
