

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
  
      cy.get('div#bodyPanel div')
        .eq(1)
        .find('h1.title')
        .should('be.visible')
        .should('have.text', 'Welcome ' + username); 
  });
  