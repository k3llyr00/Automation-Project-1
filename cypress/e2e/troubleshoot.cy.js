beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

describe('Input fields', () => {
    it.only('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        cy.get('#username').type('peterelama')
        cy.get('input[name="email"]').type('elamapetef@gmail.com')
        cy.get('[data-cy="name"]').type('Peter')
        cy.get('input[name="lastName"]').type('Elama')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#htmlFavLanguage').check()
        cy.get('#vehicle1').check()
        cy.get('select#cars').select('Volvo')
        cy.get('select#animal').select('Dog')
        //Add a section for password
        cy.get('input[name="password"]').type('Theundertaker')
        cy.get('[name="confirm"]').type('Theundertaker')

        cy.contains('Password section').click();
        
        // Add assertion, that error message is not visible anymoreand that submit button is now enabled
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')

        // Assert that after submitting the form system show successful message
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })
})