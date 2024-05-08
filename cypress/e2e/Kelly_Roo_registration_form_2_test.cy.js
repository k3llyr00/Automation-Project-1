const { faker } = require('@faker-js/faker')

// Declaring variables
const username = faker.internet.userName()
const email = faker.internet.email()
const firstName = faker.person.firstName()
const lastName = faker.person.lastName()
const phoneNumber = faker.number.int({ min: 0, max: 9999999999 })
let password = faker.internet.password()

//Declaring function(s)
function inputMandatoryData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type(email)
    cy.get('[data-cy="name"]').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('[data-testid="phoneNumberTestId"]').type(phoneNumber)
    cy.get('#password').type(password)
    cy.get('#confirm').type(password)
}

function inputAllData() {
    inputMandatoryData()
    cy.get('#phpFavLanguage').check()
    cy.get('#vehicle2').check()
    cy.get( '#cars' ).select( 'Audi' ) // optional, because by default it already have value
    cy.get( '#animal' ).select( 'Snake' ) // optional, because by default it already have value
}




beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Calling function for filling mandatory fields
        inputMandatoryData()

        cy.get( '#cars' ).select( 'Audi' ); // optional, because by default it already have value
        cy.get( '#animal' ).select( 'Snake' ); // optional, because by default it already have value

        cy.get('[name="confirm"]').clear().type('NotRandomPassword')
        cy.contains('Password section').click()

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible')

        cy.get('[name="confirm"]').clear()
        cy.get('[name="confirm"]').type(password)
        cy.contains('Password section').click()
        
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
    })
    
    it('User can submit form with all fields added', ()=>{
        // Calling function for filling all fields
        inputAllData()
        cy.contains('Password section').click()
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        inputMandatoryData()
        cy.contains('Password section').click()
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration')
    })


    it('Users cannot submit the registration form if email field is filled and then removed.', () => {
        inputMandatoryData()
        cy.get('#email').clear()
        cy.contains('Password section').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('be.visible')
    })
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
        cy.log('Will check second logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height it should be less than 89 and greater than 87
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.gte', 87).and('be.lte', 89)
        // get element and check its parameter width it should be less than 117 and greater than 115
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('be.gte', 115).and('be.lte', 117)
    })

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
        cy.go('back').url().should('contain', '/registration_form_2.html')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation for second link', () => {
        cy.get('nav').children().eq(1).should('be.visible')
        .and('have.attr', 'href', 'registration_form_3.html').click()

        cy.url().should('contain', '/registration_form_3.html')
        cy.get('div>h1').should('contains.text', 'Registration page')
        
        cy.go('back').url().should('contain', '/registration_form_2.html')
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
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Favourite animal dropdown is correct', () => {
        cy.get('#animal').select(2).screenshot('Animal drop-down, third value')
        cy.screenshot('Full page screenshot')

        cy.get('#animal').children().should('have.length', 6)

        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.text)
            expect(actual).to.deep.eq(['Dog', 'Cat', 'Snake', 'Hippo', 'Cow', 'Horse'])
        })
    })

})
