

Cypress.Commands.add('verifyHomePageLoads', () => {
    cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    cy.url().should('include', 'parabank');
    cy.get('body').should('be.visible');
});
Cypress.Commands.add('registrationPage', () => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');

});
Cypress.Commands.add('homePageVisible', () => {
    cy.url().should('include', 'parabank');
    cy.get('body').should('be.visible');
});
const { faker } = require('@faker-js/faker');

Cypress.Commands.add('fillRegistrationForm', () => {
    const password = faker.internet.password();
    const username = faker.internet.userName();

    cy.get('input[name="customer.firstName"]').type(faker.person.firstName());
    cy.get('input[name="customer.lastName"]').type(faker.person.lastName());
    cy.get('input[name="customer.address.street"]').type(faker.location.streetAddress());
    cy.get('input[name="customer.address.city"]').type(faker.location.city());
    cy.get('input[name="customer.address.state"]').type(faker.location.state());
    cy.get('input[name="customer.address.zipCode"]').type(faker.location.zipCode());
    cy.get('input[name="customer.phoneNumber"]').type(faker.phone.number());
    cy.get('input[name="customer.ssn"]').type(faker.string.numeric(9));

    cy.get("input[id='customer.username']").type(username);
    cy.get("input[id='customer.password']").type(password);
    cy.get("input[id='repeatedPassword']").type(password);

    cy.get("input[value='Register']").click();
    cy.get('div#bodyPanel div').eq(1).find('h1.title').should('be.visible').should('have.text', 'Welcome ' + username);

    cy.get("a[href='logout.htm']").click();
    cy.url().should('include', 'parabank');
    cy.get('body').should('be.visible');
});


Cypress.Commands.add('registrationNoName', () => {
    const password = faker.internet.password();
    const username = faker.internet.userName();

    // cy.get('input[name="customer.firstName"]').type(faker.person.firstName());
    cy.get('input[name="customer.lastName"]').type(faker.person.lastName());
    cy.get('input[name="customer.address.street"]').type(faker.location.streetAddress());
    cy.get('input[name="customer.address.city"]').type(faker.location.city());
    cy.get('input[name="customer.address.state"]').type(faker.location.state());
    cy.get('input[name="customer.address.zipCode"]').type(faker.location.zipCode());
    cy.get('input[name="customer.phoneNumber"]').type(faker.phone.number());
    cy.get('input[name="customer.ssn"]').type(faker.string.numeric(9));

    cy.get("input[id='customer.username']").type(username);
    cy.get("input[id='customer.password']").type(password);
    cy.get("input[id='repeatedPassword']").type(password);

    cy.get("input[value='Register']").click();
  
    cy.get('table.form2 tbody tr').eq(0).find('td').eq(2).find('span') .should('exist').should('have.text','First name is required.')

});
Cypress.Commands.add('registrationWithWrongPass', () => {
    const password = faker.internet.password();
    const username = faker.internet.userName();

    cy.get('input[name="customer.firstName"]').type(faker.person.firstName());
    cy.get('input[name="customer.lastName"]').type(faker.person.lastName());
    cy.get('input[name="customer.address.street"]').type(faker.location.streetAddress());
    cy.get('input[name="customer.address.city"]').type(faker.location.city());
    cy.get('input[name="customer.address.state"]').type(faker.location.state());
    cy.get('input[name="customer.address.zipCode"]').type(faker.location.zipCode());
    cy.get('input[name="customer.phoneNumber"]').type(faker.phone.number());
    cy.get('input[name="customer.ssn"]').type(faker.string.numeric(9));

    cy.get("input[id='customer.username']").type(username);
    cy.get("input[id='customer.password']").type(password);
    cy.get("input[id='repeatedPassword']").type("badPass");

    cy.get("input[value='Register']").click();
  
    cy.get('table.form2 tbody tr').eq(11).find('td').eq(2).find('span') .should('exist').should('have.text', 'Passwords did not match.')

});

Cypress.Commands.add('registrationAlreadyExist', () => {
    cy.fixture('parabank.json').then((userData) => {
        cy.get('input[name="customer.firstName"]').type(userData.firstName);
        cy.get('input[name="customer.lastName"]').type(userData.lastName);
        cy.get('input[name="customer.address.street"]').type(userData.address);
        cy.get('input[name="customer.address.city"]').type(userData.city);
        cy.get('input[name="customer.address.state"]').type(userData.state);
        cy.get('input[name="customer.address.zipCode"]').type(userData.zipCode);
        cy.get('input[name="customer.phoneNumber"]').type(userData.phoneNumber);
        cy.get('input[name="customer.ssn"]').type(userData.SSN);

        cy.get("input[id='customer.username']").type(userData.userName);
        cy.get("input[id='customer.password']").type(userData.userPassword);
        cy.get("input[id='repeatedPassword']").type(userData.userPassword);

        cy.get("input[value='Register']").click();

        cy.get('table.form2 tbody tr').eq(9).find('td').eq(2).find('span').should('exist').should('have.text', 'This username already exists.')
    });
});

Cypress.Commands.add('logIn', () => {
    cy.fixture('parabank.json').then((userData) => {
        
        cy.get("div[id='leftPanel'] h2").should("be.visible").and('have.text','Customer Login')
        cy.get("input[name='username']").type(userData.userName);
        cy.get("input[name='password']").type(userData.userPassword);
        cy.get("input[value='Log In']").click();

    });
});
Cypress.Commands.add('wronglogIn', () => {

        cy.get("div[id='leftPanel'] h2").should("be.visible").and('have.text','Customer Login')
        cy.get("input[name='username']").type(faker.person.firstName());
        cy.get("input[name='password']").type(faker.internet.password());
        cy.get("input[value='Log In']").click();
        cy.get('.error').should("be.visible").and('have.text','An internal error has occurred and has been logged.')

        

    });

    Cypress.Commands.add('payeeInfo', () => {
        cy.fixture('parabank.json').then((userData) => {
            cy.get("input[name='payee.name']").type(userData.firstName);
            cy.get("input[name='payee.address.street']").type(userData.address);
            cy.get("input[name='payee.address.city']").type(userData.city);
            cy.get("input[name='payee.address.state']").type(userData.state);
            cy.get("input[name='payee.address.zipCode']").type(userData.zipCode);
            cy.get('input[name="payee.phoneNumber"]').type(userData.phoneNumber);
    
            cy.get("input[name='payee.accountNumber']").type(userData.accountNumber);
            cy.get("input[name='verifyAccount']").type(userData.verifyAccountNumber);
            cy.get("input[name='amount']").type(userData.amount);
    
            cy.get("input[value='Send Payment']").click();
    
      
        });
    });
    