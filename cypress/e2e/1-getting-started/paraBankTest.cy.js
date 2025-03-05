import selectors from '../../support/selectors';

// describe('ParaBank homePage functionalities', () => {
//     beforeEach(() => {
//         cy.verifyHomePageLoads();
//     });

//     it('Verify the logo is clickable and redirects to the correct URL.', () => {
//         cy.get(selectors.homePageLogo).trigger('mouseover').should('have.css', 'cursor', 'pointer').click();
//         cy.homePageVisible();
//     });

//     it('Verifying the top left column contains 5 elements', () => {
//         cy.get(selectors.leftMenu).should('exist');
//         cy.get(selectors.leftMenu).find('li').should('have.length', 6);
//     });

//     it('Verifying ATM Services column', () => {
//         cy.get(selectors.services).find("li").should('have.length', 5);
//         const expectedTexts = ['ATM Services', 'Withdraw Funds', 'Transfer Funds', 'Check Balances', 'Make Deposits'];
//         expectedTexts.forEach((text, index) => {
//             cy.get(selectors.services).find("li").eq(index).should('have.text', text).trigger('mouseover').should('have.css', 'cursor', 'auto');
//         });
//     });

//     it('Verifying Online Services column', () => {
//         cy.get(selectors.onlineServices).find("li").should('have.length', 4);
//         const expectedTexts = ['Online Services', 'Bill Pay', 'Account History', 'Transfer Funds'];
//         expectedTexts.forEach((text, index) => {
//             cy.get(selectors.onlineServices).find("li").eq(index).should('have.text', text).trigger('mouseover').should('have.css', 'cursor', 'auto');
//         });
//     });

//     it('Verifying if the third column of the box holds 4 elements', () => {
//         cy.get(selectors.events).find("li").should('have.length', 4);
//     });

//     it('Verifying clicking on first READMORE, will redirect to expected url', () => {
//         cy.contains('a', 'Read More').click();
//         cy.get(selectors.firstReadmeTitle).should('be.visible').and('have.text', 'Available Bookstore SOAP services:');
//     });

//     it('Verifying clicking on second READMORE, will redirect to expected url', () => {
//         cy.get(selectors.secondReadme).click();
//         cy.get(selectors.secondReadmeTitle).should('be.visible').and('have.text', 'ParaBank News');
//     });

//     it("Check that the home page 'Register' link are visible", () => {
//         cy.contains('Register').should('exist').and('be.visible');
//     });

//     it('Click on the "Register" link', () => {
//         cy.contains('Register').click();
//     });
// });

// describe('Successful Registration', () => {
//     beforeEach(() => {
//         cy.registrationPage();
//     });

//     it('Should display the "Signing up is easy!" message and the registration form.', () => {
//         cy.get(selectors.signUpTitle).should('be.visible').and('have.text', 'Signing up is easy!');
//         cy.get('form').should('be.visible');
//     });

//     it('Should successfully create a user account when all required fields are filled with valid information.', () => {
//         cy.fillRegistrationForm();
//     });

//     it('Should show an error when the First Name is missing but other fields are filled correctly.', () => {
//         cy.registrationNoName();
//     });

//     it('Should show an error when the password is missing but other fields are filled correctly.', () => {
//         cy.registrationWithWrongPass();
//     });

//     it('Should show an error when a pre-registered username is entered.', () => {
//         cy.registrationAlreadyExist();
//     });
// });

// describe('Login User with Correct Email and Password', () => {
//     beforeEach(() => {
//         cy.verifyHomePageLoads();
//     });

//     it('Successful Login', () => {
//         cy.logIn();
//     });

//     it('Unsuccessful Login with Incorrect Email and Password:', () => {
//         cy.wronglogIn();
//         //bug test pass when email and pass are not correct, generated with faker.
//     });
// });

describe('Account services functions', () => {
    beforeEach(() => {
        cy.verifyHomePageLoads();
    });

    // it('Bill Payment test', () => {
    //     cy.logIn();
    //     cy.get(selectors.billPay).click();
    //     cy.get(selectors.billPayVsbl).should('be.visible').and('have.text','Bill Payment Service');
    //     cy.payeeInfo();
    //     cy.get(selectors.payCompletevsbl).should('be.visible').and('have.text','Bill Payment Complete');
    //     cy.get(selectors.accOverview).click();
    //     cy.get(selectors.accOverviewVsbl).should('be.visible').and('have.text','Accounts Overview');
    // });

    // it('Open New Account test "CHECKING"', () => {
    //     cy.logIn();
    //     cy.get(selectors.newAcc).click();
    //     cy.get(selectors.newAccVsbl).should('be.visible').and('have.text', 'Open New Account');
    //     cy.get(selectors.savings).select('CHECKING');
    //     cy.wait(1000);
    //     cy.get(selectors.openNewAccBtn).click();
    //     cy.get(selectors.successMsg).should('be.visible').and('have.text', 'Congratulations, your account is now open.');
    // });

    // it('Open New Account test "SAVINGS"', () => {
    //     cy.logIn();
    //     cy.get(selectors.newAcc).click();
    //     cy.get(selectors.newAccVsbl).should('be.visible').and('have.text', 'Open New Account');
    //     cy.get(selectors.savings).select('SAVINGS');
    //     cy.wait(1000);
    //     cy.get(selectors.openNewAccBtn).click();
    //     cy.get(selectors.successMsg).should('be.visible').and('have.text', 'Congratulations, your account is now open.');
    // });

    // it('Money transfer between my accounts', () => {
    //     cy.logIn();
    //     cy.get(selectors.tranfersFunds).click();
    //     cy.get(selectors.tranfersFundsVsbl).should('be.visible');
    //     cy.wait(2000);
    //     cy.get(selectors.amount).type("1");
    //     cy.get(selectors.tranferBtn).click();
    //     cy.get(selectors.amount).should('be.visible');
    //     cy.get(selectors.fromAcc).should('be.visible');
    //     cy.get(selectors.toAcc).should('be.visible');
    // });
    it('Money transfer between my accounts confirm', () => {
        cy.logIn();
        cy.get(selectors.accOverview).click();
        cy.get(selectors.accOverviewVsbl).should('be.visible').and('have.text','Accounts Overview')
        cy.get(selectors.accnmbr).click();
   
    });
    it('Update contact information', () => {
        cy.logIn();
        
     
   
    });

});
