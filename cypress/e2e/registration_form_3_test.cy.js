const { faker } = require('@faker-js/faker')

//********** Declaring variables for functional testing **********
const fullName = faker.person.fullName()
const email = faker.internet.email()


//********** Functions **********
function fillMandatoryFields() {
    cy.get('#name').type(fullName)
    cy.get('[name="email"]').type(email)

    //select the country
    cy.get('#country').find('option').then(options => {
        // Get the length of the options
        const numberOfOptions = options.length;
        // Generate a random index between 0 and the length of options array
        const randomIndex = faker.number.int({ min: 1, max: numberOfOptions - 1 });
        // Get the value of the option at the random index
        const randomOptionValue = options[randomIndex].value;
        // Select the random option
        cy.get('#country').select(randomOptionValue)
    
    })

    //select the city 
    cy.get('#city').find('option').then(options => {
        // Get the length of the options
        const numberOfOptions = options.length;
        // Generate a random index between 0 and the length of options array
        const randomIndex = faker.number.int({ min: 1, max: numberOfOptions - 1 });
        // Get the value of the option at the random index
        const randomOptionValue = options[randomIndex].value;
        // Select the random option
        cy.get('#city').select(randomOptionValue)
        // cy.screenshot('Full page screenshot')
    
    })

    //Accept privacy policy
    cy.get('input[type="checkbox"]').eq(0).click()

}
// Fill all data without uploading file
function fillAllFields() { 
    cy.get('#name').type(fullName)
    cy.get('[name="email"]').type(email)

    //select the country
    cy.get('#country').find('option').then(options => {
        // Get the length of the options
        const numberOfOptions = options.length;
        // Generate a random index between 0 and the length of options array
        const randomIndex = faker.number.int({ min: 1, max: numberOfOptions - 1 });
        // Get the value of the option at the random index
        const randomOptionValue = options[randomIndex].value;
        // Select the random option
        cy.get('#country').select(randomOptionValue)
    
    })

    //select the city 
    cy.get('#city').find('option').then(options => {
        // Get the length of the options
        const numberOfOptions = options.length;
        // Generate a random index between 0 and the length of options array
        const randomIndex = faker.number.int({ min: 1, max: numberOfOptions - 1 });
        // Get the value of the option at the random index
        const randomOptionValue = options[randomIndex].value;
        // Select the random option
        cy.get('#city').select(randomOptionValue)
        // cy.screenshot('Full page screenshot')
    
    })

    //Date of registration
    cy.get('label').contains('Date of registration').siblings('input').click()
    
    // function for today's date
    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    //Click on calendar and type in todays date
    cy.get('label').contains('Date of registration').siblings('input').type(getFormattedDate())

    //select the sequence of newsletter
    cy.get('input[type="radio"]').then(radioButtons => {
        // Get the length of the radio buttons
        const numberOfButtons = radioButtons.length;
        // Generate a random index between 0 and the length of the radio buttons array
        const randomIndex = faker.number.int({ min: 0, max: numberOfButtons - 1 });
        // Get the value of the radio button at the random index
        const randomRadioButton = radioButtons[randomIndex];
        // Select the random radio button
        cy.wrap(randomRadioButton).check(); // Assuming you want to select the radio button
    });

    //Select the birthday
    cy.get('#birthday').click()

    // function for choosing birthday date
    function getRandomDate() {
        const today = new Date();
        const minYear = 1900;
        const maxYear = today.getFullYear();
        const randomYear = faker.number.int({ min: minYear, max: maxYear });
        const randomMonth = faker.number.int({ min: 1, max: 12 });
        const randomDay = faker.number.int({ min: 1, max: new Date(randomYear, randomMonth, 0).getDate() });
        const formattedMonth = String(randomMonth).padStart(2, '0');
        const formattedDay = String(randomDay).padStart(2, '0');
        return `${randomYear}-${formattedMonth}-${formattedDay}`;
    }

    //Click on calendar and type in todays date
    cy.get('#birthday').type(getRandomDate())

    //Accept privacy and cookie policy
    cy.get('input[type="checkbox"]').eq(0).click()
    cy.get('input[type="checkbox"]').eq(1).click()

}

// //********** The beginning of tests **********

beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    *radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    *checkboxes, their content and links
    *email format
 */

describe.skip('Visual tests for registration form 3', () => {

    it('Radio buttons and its content', () => {
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

    it('Checkboxes and its content, links', () => {
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

        // Check the checkbox link
        cy.get('button a').should('be.visible')
            .and('have.attr', 'href', 'cookiePolicy.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/cookiePolicy.html')
        
        // Go back to previous page
        cy.go('back').url().should('contain', '/registration_form_3.html');
        cy.log('Back again in registration form 3')

    });

    it('Email format', () => {
        // Attempting to enter an Invalid email and appropriate error message should appear
        cy.get('input[name="email"]').type('@email')
        cy.get('span[ng-show="myForm.email.$error.email"]').should('have.text', 'Invalid email address.').should('have.css', 'color', 'rgb(255, 0, 0)');
        // Attempting to enter an empty email and appropriate error message should appear
        cy.get('input[name="email"]').type(' ')
        cy.get('span[ng-show="myForm.email.$error.required"]').should('have.text', 'Email is required.').should('have.css', 'color', 'rgb(255, 0, 0)');

        // Entering correct email
        cy.get('input[name="email"]').clear()
        cy.get('input[name="email"]').type('correct@email.com')
        cy.get('span[ng-show="myForm.email.$error.email"]').should('not.be.visible');
        cy.get('span[ng-show="myForm.email.$error.required"]').should('not.be.visible');


    });

    it('Dropdown and dependencies', () => {
        // Assert on options
        cy.get('#country').find('option').should('have.length', 4)
        cy.get('#country').find('option').then(options => {
            const actual = [...options].map(option => option.text)
            expect(actual).to.deep.eq(['', 'Spain', 'Estonia', 'Austria'])
        })

        // Select empty string from country dropdown
        cy.get('#country').select('')

        // Assert on options in city dropdown, when country is empty string
        cy.get('#city').find('option')
        .should('have.length', 1) // Ensure there's only one option
        .should('have.text', '') // Ensure the text of the option is empty

        //Select Spain and verify dependencies
        cy.get('#country').select('Spain')

        // Assert on options in city dropdown, when country is Spain
        cy.get('#city').find('option').should('have.length', 5)
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.text)
            expect(actual).to.deep.eq(['', 'Malaga', 'Madrid', 'Valencia', 'Corralejo'])

        })

        //Select Estonia and verify dependencies
        cy.get('#country').select('Estonia')

        // Assert on options in city dropdown,, when country is Estonia
        cy.get('#city').find('option').should('have.length', 4)
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.text)
            expect(actual).to.deep.eq(['', 'Tallinn', 'Haapsalu', 'Tartu'])

        })

        //Select Austria and verify dependencies
        cy.get('#country').select('Austria')

        // Assert on options in city dropdown, when country is Austria
        cy.get('#city').find('option').should('have.length', 4)
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.text)
            expect(actual).to.deep.eq(['', 'Vienna', 'Salzburg', 'Innsbruck'])
 
        })

        // if city is already chosen and country is updated, then city choice should be removed
        cy.get('#city').select('Vienna')
        cy.get('#country').select('Estonia')

        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.text)
            expect(actual).to.not.include('Vienna')
        });

        //Selecting multiple options
        cy.get('#city')
        .select(['Tallinn', 'Haapsalu'])
        .invoke('val')
        .should('deep.equal', ['string:Tallinn', 'string:Haapsalu']) //verifying the outcome
        
    });    
    
})

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* + Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions +
    * only mandatory fields are filled in + corresponding assertions +
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!) +
 */

describe('Functional tests for registration form 3', () => {
    it('Successful submission when mandatory fields are filled with valid information', () => {
        //Call the function
        fillMandatoryFields()

        //submit button is enabled
        cy.get('input[type="submit"]').should('be.enabled');

        // Call the postYourAdd() function
        cy.window().then(window => {
            window.postYourAdd();
        });

        // Check for the successFrame element
        cy.get('#successFrame').should('exist');

        // Now you can proceed with capturing the success message
        cy.get('#successFrame').invoke('text').as('successMessage');

        cy.screenshot('Success message')

        // Now you can assert or use the captured success message as needed
        cy.get('@successMessage').should('contain', 'Successful registration')

        // After submission the page redirects and displays success message
         //submit button is enabled
         cy.get('input[type="submit"]').click()
         cy.get('h1').should('have.text', 'Submission received')
         cy.url().should('contain', '/cypress/fixtures/upload_file.html?')

    })

    it('Successful submission when all fields are filled with valid information (not uploading file)', () => {
        //Call the function
        fillAllFields()

        //submit button is enabled
        cy.get('input[type="submit"]').should('be.enabled');

        // Call the postYourAdd() function
        cy.window().then(window => {
            window.postYourAdd();
        });

        // Check for the successFrame element
        cy.get('#successFrame').should('exist');

        // Now you can proceed with capturing the success message
        cy.get('#successFrame').invoke('text').as('successMessage');

        cy.screenshot('Success message')

        // Now you can assert or use the captured success message as needed
        cy.get('@successMessage').should('contain', 'Successful registration')

        // After submission the page redirects and displays success message
         //submit button is enabled
         cy.get('input[type="submit"]').click()
         cy.get('h1').should('have.text', 'Submission received')
         cy.url().should('contain', '/cypress/fixtures/upload_file.html?')

    })

    it('Mandatory fields are missing', () => {
        // code here

    })

    it('Uploading and submitting a file', () => {
        // Define the full file path
        const filePath = 'example_cypress.txt';
    
        // Read the file contents
        cy.readFile(filePath, 'utf-8').then(fileContent => {
            const blob = new Blob([fileContent], { type: 'text/plain' });
            const file = new File([blob], 'example_cypress.txt');
            cy.get('#myFile').then(input => {
                const dt = new DataTransfer();
                dt.items.add(file);
                input[0].files = dt.files;
            });

        });

        // validate the uploaded file
        cy.get('#myFile').invoke('val').as('uploadedFilePath');
        cy.get('@uploadedFilePath').then(filePath => {
            const fileName = filePath.split('\\').pop(); // Extract the file name from the path
            cy.log('Uploaded file name:', fileName);
            expect(fileName).to.eq('example_cypress.txt');
        });

        // Submitting the file
        cy.get('button[type="submit"]').click()

        // After submission the page redirects and displays success message
         cy.get('h1').should('have.text', 'Submission received')
         cy.url().should('contain', '/cypress/fixtures/upload_file.html?')
    });

})

