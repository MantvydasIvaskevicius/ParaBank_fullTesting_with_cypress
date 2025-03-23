

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
Cypress.Commands.add('longRegForm', () => {
    // Generate a long username and password using Faker
    const username = faker.internet.userName() + 'looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong';
    const password = faker.internet.password(20) + 'looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong';

    // Fill out the registration form with Faker data
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

    cy.get('table.form2 tbody tr').eq(0).find('td').eq(2).find('span').should('exist').should('have.text', 'First name is required.')

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

    cy.get('table.form2 tbody tr').eq(11).find('td').eq(2).find('span').should('exist').should('have.text', 'Passwords did not match.')

});

Cypress.Commands.add('registrationAlreadyExist', () => {
    cy.fixture('parabank.json').then((userData) => {
        cy.get('input[name="customer.firstName"]').type("Petras");
        cy.get('input[name="customer.lastName"]').type("Jonas");
        cy.get('input[name="customer.address.street"]').type("Vilniaus g. 243, 2 ");
        cy.get('input[name="customer.address.city"]').type("Vilnius");
        cy.get('input[name="customer.address.state"]').type("Vilniaus apskritis");
        cy.get('input[name="customer.address.zipCode"]').type("LT00100");
        cy.get('input[name="customer.phoneNumber"]').type("8155234567");
        cy.get('input[name="customer.ssn"]').type("563934927");

        cy.get("input[id='customer.username']").type("petras24");
        cy.get("input[id='customer.password']").type("Petras2424");
        cy.get("input[id='repeatedPassword']").type("Petras2424");

        cy.get("input[value='Register']").click();

        cy.get('table.form2 tbody tr').eq(9).find('td').eq(2).find('span').should('exist').should('have.text', 'This username already exists.')
    });
});

Cypress.Commands.add('logIn', () => {
    cy.fixture('parabank.json').then((userData) => {

        cy.get("div[id='leftPanel'] h2").should("be.visible").and('have.text', 'Customer Login')
        cy.get("input[name='username']").type("petras24");
        cy.get("input[name='password']").type("Petras2424");
        cy.get("input[value='Log In']").click();

    });
});
Cypress.Commands.add('wronglogIn', () => {

    cy.get("div[id='leftPanel'] h2").should("be.visible").and('have.text', 'Customer Login')
    cy.get("input[name='username']").type(faker.person.firstName());
    cy.get("input[name='password']").type(faker.internet.password());
    cy.get("input[value='Log In']").click();
    cy.get('.error').should("be.visible").and('have.text', 'An internal error has occurred and has been logged.')



});

Cypress.Commands.add('payeeInfo', () => {
    cy.fixture('parabank.json').then((userData) => {
        cy.get("input[name='payee.name']").type("Petras");
        cy.get("input[name='payee.address.street']").type("Vilniaus g. 243, 2 ");
        cy.get("input[name='payee.address.city']").type("Vilnius");
        cy.get("input[name='payee.address.state']").type("Vilniaus apskritis");
        cy.get("input[name='payee.address.zipCode']").type("LT00100");
        cy.get('input[name="payee.phoneNumber"]').type("8155234567");

        cy.get("input[name='payee.accountNumber']").type("12345");
        cy.get("input[name='verifyAccount']").type("12345");
        cy.get("input[name='amount']").type("1");

        cy.get("input[value='Send Payment']").click();


    });
});
Cypress.Commands.add('missingpayeeInfo', () => {
    cy.fixture('parabank.json').then((userData) => {

        cy.get("input[name='payee.address.street']").type("Vilniaus g. 243, 2 ");
        cy.get("input[name='payee.address.city']").type("Vilnius");
        cy.get("input[name='payee.address.state']").type("Vilniaus apskritis");
        cy.get("input[name='payee.address.zipCode']").type("LT00100");
        cy.get('input[name="payee.phoneNumber"]').type("8155234567");

   
        cy.get("input[name='amount']").type("1");

        cy.get("input[value='Send Payment']").click();


    });
});

Cypress.Commands.add('UpdateProfile', () => {
    cy.get("input[id='customer.address.street']").clear().type("updatedAdress");
    cy.get("input[id='customer.address.city']").clear().type("updatedCity");
    cy.get("input[id='customer.address.state']").clear().type("updatedState");
    cy.get("input[id='customer.address.zipCode']").clear().type("505165");
    cy.get("input[value='Update Profile']").click();


});
Cypress.Commands.add('UpdateProfile2', () => {
    cy.get("input[id='customer.firstName']").clear().type("updatedName2");
    cy.get("input[id='customer.lastName']").clear().type("updatedLastName2");
    cy.get("input[id='customer.phoneNumber']").clear().type("55584452");
    cy.get("input[value='Update Profile']").click();


});
Cypress.Commands.add('emptyProfile', () => {
    cy.get("input[id='customer.firstName']").click().clear();
    cy.get("input[id='customer.address.state']").click().clear();
    cy.get("input[id='customer.address.zipCode']").click().clear();
    cy.get("input[value='Update Profile']").click();


});
Cypress.Commands.add('customerCareForm', () => {
    cy.get("#name").type('Peter')
    cy.get("#email").type('Peter123@gmail.com')
    cy.get("#phone").type('16516216516')
    cy.get("#message").type('help me fix this website')
    cy.get("input[value='Send to Customer Care']").click();

});
Cypress.Commands.add('findLogInInfo', () => {
    cy.fixture('parabank.json').then((userData) => {
        cy.get("#firstName").type("Petras");
        cy.get('#lastName').type("Jonas");
        cy.get("input[id='address.street']").type("Vilniaus g. 243, 2 ");
        cy.get("input[id='address.city']").type("Vilnius");
        cy.get("input[id='address.state']").type("Vilniaus apskritis");
        cy.get("input[id='address.zipCode']").type("LT00100");
        cy.get('#ssn').type("563934927");


        cy.get("input[value='Find My Login Info']").click();


    });
});

Cypress.Commands.add('weakPassword', () => {
    cy.fixture('parabank.json').then((userData) => {

        cy.get('input[name="customer.firstName"]').type('Tester');
        cy.get('input[name="customer.lastName"]').type('User');
        cy.get('input[name="customer.address.street"]').type('123 Test St');
        cy.get('input[name="customer.address.city"]').type('Test City');
        cy.get('input[name="customer.address.state"]').type('TS');
        cy.get('input[name="customer.address.zipCode"]').type('12345');
        cy.get('input[name="customer.phoneNumber"]').type('123-456-7890');
        cy.get('input[name="customer.ssn"]').type('123-45-6789');
        cy.get('input[name="customer.username"]').type(faker.internet.userName());
        cy.get('input[name="customer.password"]').type('12'); 
        cy.get('input[name="repeatedPassword"]').type('12'); 

        cy.get('input[value="Register"]').click();
  

        cy.get('#passwordError')
          .should('be.visible')
          .and('contain', 'Password must be at least 8 characters long, contain at least one uppercase letter, and one number.');


    });
});

Cypress.Commands.add('diffrentPassword', () => {
    cy.fixture('parabank.json').then((userData) => {

        cy.get('input[name="customer.firstName"]').type('Tester');
        cy.get('input[name="customer.lastName"]').type('User');
        cy.get('input[name="customer.address.street"]').type('123 Test St');
        cy.get('input[name="customer.address.city"]').type('Test City');
        cy.get('input[name="customer.address.state"]').type('TS');
        cy.get('input[name="customer.address.zipCode"]').type('12345');
        cy.get('input[name="customer.phoneNumber"]').type('123-456-7890');
        cy.get('input[name="customer.ssn"]').type('123-45-6789');
        cy.get('input[name="customer.username"]').type(faker.internet.userName());
        cy.get('input[name="customer.password"]').type('12'); 
        cy.get('input[name="repeatedPassword"]').type('12qqwqw'); 

        cy.get('input[value="Register"]').click();
  

    });
});
