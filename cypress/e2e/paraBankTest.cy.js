import selectors from '../support/selectors';

describe('ParaBank homePage functionalities', () => {
    beforeEach(() => {
        cy.verifyHomePageLoads();
    });

    it('Should verify that clicking the logo redirects to the homepage.', () => {
        cy.get(selectors.homePageLogo).trigger('mouseover').should('have.css', 'cursor', 'pointer').click();
        cy.homePageVisible();
    });

    it('Verifying the top left column contains 5 elements', () => {
        cy.get(selectors.leftMenu).should('exist');
        cy.get(selectors.leftMenu).find('li').should('have.length', 6);
    });

    it('Verify ATM Services section displays correct options', () => {
        cy.get(selectors.services).find("li").should('have.length', 5);
        const expectedTexts = ['ATM Services', 'Withdraw Funds', 'Transfer Funds', 'Check Balances', 'Make Deposits'];
        expectedTexts.forEach((text, index) => {
            cy.get(selectors.services).find("li").eq(index).should('have.text', text).trigger('mouseover').should('have.css', 'cursor', 'auto');
        });
    });

    it('Verify Online Services section displays correct options', () => {
        cy.get(selectors.onlineServices).find("li").should('have.length', 4);
        const expectedTexts = ['Online Services', 'Bill Pay', 'Account History', 'Transfer Funds'];
        expectedTexts.forEach((text, index) => {
            cy.get(selectors.onlineServices).find("li").eq(index).should('have.text', text).trigger('mouseover').should('have.css', 'cursor', 'auto');
        });
    });

    it('Verify the third column contains 4 elements', () => {
        cy.get(selectors.events).find("li").should('have.length', 4);
    });

    it('Verify first "Read More" link navigates to expected page', () => {
        cy.contains('a', 'Read More').click();
        cy.get(selectors.firstReadmeTitle).should('be.visible').and('have.text', 'Available Bookstore SOAP services:');
    });

    it('Verify second "Read More" link navigates to expected page', () => {
        cy.get(selectors.secondReadme).click();
        cy.get(selectors.secondReadmeTitle).should('be.visible').and('have.text', 'ParaBank News');
    });

    it('Verify "Register" link is visible', () => {
        cy.contains('Register').should('exist').and('be.visible');
    });

    it('Verify clicking "Register" link navigates to the registration page', () => {
        cy.contains('Register').click();
    });
});

describe('Successful Registration', () => {
    beforeEach(() => {
        cy.registrationPage();
    });

    it('Verify registration page displays the "Signing up is easy!" message', () => {
        cy.get(selectors.signUpTitle).should('be.visible').and('have.text', 'Signing up is easy!');
        cy.get('form').should('be.visible');
    });


    it('Successfully create a user account with valid inputs', () => {
        cy.fillRegistrationForm();
    });

    it('Show error when first name is missing in registration form', () => {
        cy.registrationNoName();
    });

    it('Show error when password did not match in registration form', () => {
        cy.registrationWithWrongPass();
    });

    it('Show error when using a pre-registered username', () => {
        cy.registrationAlreadyExist();
    });

    it('registering with an extremely long username or password.', () => {
        cy.longRegForm();
        cy.get(selectors.errormsg).should('be.visible');
    });

});

describe('Login User with Correct Email and Password', () => {
    beforeEach(() => {
        cy.verifyHomePageLoads();
    });

    it('Verify successful login with valid credentials', () => {
        cy.logIn();
    });

    it('Verify error message appears for incorrect email and password', () => {
        cy.wronglogIn();
        //bug test pass when email and pass are not correct, generated with faker.
    });
});

describe("Successful login and logout", () => {
    beforeEach(() => {
        cy.verifyHomePageLoads();
    });

    it("should log in successfully and log out successfully", () => {
        cy.logIn();
        cy.get(selectors.logOut).click();
        cy.url().should('include', 'parabank');
        cy.get('body').should('be.visible');
    });

});

describe('User Registration Security Tests', () => {
    it('should show an error message when the password does not meet complexity requirements', () => {
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        cy.weakPassword();
        cy.get('input[value="Register"]').click();
        cy.get('#passwordError')
            .should('be.visible')
            .and('contain', 'Password must be at least 8 characters long, contain at least one uppercase letter, and one number.');
    });

    it('should not allow SQL injection in the username or password fields', () => {
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        cy.get(selectors.loginUser).type("admin' OR 1=1 --");
        cy.get(selectors.loginPass).type('ValidPassword123!');
        cy.get(selectors.loginClick).click();
        cy.wait(2000);
    });

    it('should show an error when passwords do not match', () => {
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        cy.diffrentPassword();
        cy.get("span[id='repeatedPassword.errors']")
            .should('be.visible')
            .and('have.text', 'Passwords did not match.');
    });
});


describe('Account services functions', () => {
    beforeEach(() => {
        cy.verifyHomePageLoads();
    });

    it('Verify successful bill payment process', () => {
        cy.logIn();
        cy.get(selectors.billPay).click();
        cy.get(selectors.billPayVsbl).should('be.visible').and('have.text', 'Bill Payment Service');
        cy.payeeInfo();
        cy.get(selectors.payCompletevsbl).should('be.visible').and('have.text', 'Bill Payment Complete');
        cy.get(selectors.accOverview).click();
        cy.get(selectors.accOverviewVsbl).should('be.visible').and('have.text', 'Accounts Overview');
    });

    it('Try to pay a bill without entering payee details.', () => {
        cy.logIn();
        cy.get(selectors.billPay).click();
        cy.get(selectors.billPayVsbl).should('be.visible').and('have.text', 'Bill Payment Service');
        cy.missingpayeeInfo();
        cy.get(selectors.payeerror).should('be.visible').and('have.text', "Payee name is required.");
        cy.get(selectors.accNmrError).should('be.visible').and('have.text', "Account number is required.");
        cy.get(selectors.accNmrError2).should('be.visible').and('have.text', "Account number is required.");;
    });

    it('Open a new "CHECKING" account successfully"', () => {
        cy.logIn();
        cy.get(selectors.newAcc).click();
        cy.get(selectors.newAccVsbl).should('be.visible').and('have.text', 'Open New Account');
        cy.get(selectors.savings).select('CHECKING');
        cy.wait(1000);
        cy.get(selectors.openNewAccBtn).click();
        cy.get(selectors.successMsg).should('be.visible').and('have.text', 'Congratulations, your account is now open.');
    });

    it('Open a new "SAVINGS" account successfully"', () => {
        cy.logIn();
        cy.get(selectors.newAcc).click();
        cy.get(selectors.newAccVsbl).should('be.visible').and('have.text', 'Open New Account');
        cy.get(selectors.savings).select('SAVINGS');
        cy.wait(1000);
        cy.get(selectors.openNewAccBtn).click();
        cy.get(selectors.successMsg).should('be.visible').and('have.text', 'Congratulations, your account is now open.');
    });

    it('Transfer money between user accounts', () => {
        cy.logIn();
        cy.get(selectors.tranfersFunds).click();
        cy.get(selectors.tranfersFundsVsbl).should('be.visible');
        cy.wait(2000);
        cy.get(selectors.amount).type("1");
        cy.get(selectors.tranferBtn).click();
        cy.get(selectors.amount).should('be.visible');
        cy.get(selectors.fromAcc).should('be.visible');
        cy.get(selectors.toAcc).should('be.visible');
    });

    it('Attempt to transfer more money than available balance.', () => {
        cy.logIn();
        cy.get(selectors.tranfersFunds).click();
        cy.get(selectors.tranfersFundsVsbl).should('be.visible');
        cy.wait(2000);
        cy.get(selectors.amount).type("11111111111111111111111");
        cy.get(selectors.tranferBtn).click();
        cy.get(selectors.errormsg).should('be.visible');
    });

    it('Verify transferred money appears in account overview', () => {
        cy.logIn();
        cy.get(selectors.accOverview).click();
        cy.get(selectors.accOverviewVsbl).should('be.visible').and('have.text', 'Accounts Overview')


    });

    it('Update address, city, state, and zip code successfully', () => {
        cy.logIn();
        cy.get(selectors.updateContact).click();
        cy.get(selectors.updatePrflVsbl).should('be.visible').and('have.text', 'Update Profile');
        cy.wait(1000);
        cy.UpdateProfile();
        cy.get(selectors.successUpdt).should('be.visible').and('have.text', 'Your updated address and phone number have been added to the system. ');

    });

    it('Update first name, last name, and phone number successfully', () => {
        cy.logIn();
        cy.get(selectors.updateContact).click();
        cy.get(selectors.updatePrflVsbl).should('be.visible').and('have.text', 'Update Profile');
        cy.wait(1000);
        cy.UpdateProfile2();
        cy.get(selectors.successUpdt).should('be.visible')
        //bug cant update after clicking update "profile button" getting error.    });
    });

    it('User Can Successfully Update Contact Name, Last Name, and Phone Number', () => {
        cy.logIn();
        cy.get(selectors.updateContact).click();
        cy.get(selectors.updatePrflVsbl).should('be.visible').and('have.text', 'Update Profile');
        cy.wait(1000);
        cy.UpdateProfile2();
        cy.get(selectors.successUpdt).should('be.visible')
        //bug cant update after clicking update "profile button" getting error.    });
    });

    it('Show error when attempting to update profile with empty fields', () => {
        cy.logIn();
        cy.get(selectors.updateContact).click();
        cy.get(selectors.updatePrflVsbl).should('be.visible').and('have.text', 'Update Profile');
        cy.wait(1000);
        cy.emptyProfile();
        cy.wait(1000);
        cy.get(selectors.namereq).should('be.visible').and('have.text', 'First name is required.');
        cy.get(selectors.zipreq).should('be.visible').and('have.text', 'Zip Code is required.');
        cy.get(selectors.statereq).should('be.visible').and('have.text', 'State is required.');

    });

    it('Request credit successfully', () => {
        cy.logIn();
        cy.get(selectors.reqLoanClk).click();
        cy.get(selectors.amount).type("2000");
        cy.get(selectors.downPayment).type("200");
        cy.get(selectors.applyNow).click();
        cy.get(selectors.loanResult).should('be.visible').and('have.text', 'Loan Request Processed');

    });

    it('Verify Customer Service Contact Form Submission', () => {
        cy.get(selectors.customerCareBtn).click();
        cy.get(selectors.customerVsbl).should('be.visible').and('have.text', 'Customer Care');
        cy.customerCareForm();
        cy.get(selectors.succesupportMsg).should('be.visible').and('have.text', 'A Customer Care Representative will be contacting you.');


    });
    it('Verify "Forgot Login Info" Functionality', () => {
        cy.get('a').contains('Forgot login info?').click();
        cy.get(selectors.lookup).should('be.visible').and('have.text', 'Customer Lookup');
        cy.findLogInInfo();
        cy.get(selectors.recoveraccsuccs).should('be.visible').and('have.text', 'Your login information was located successfully. You are now logged in. ');

        //bug getting errror customer information could not be found.

    });
});

describe('CAPTCHA Validation', () => {
    it('should display CAPTCHA after multiple failed login attempts', () => {
        cy.verifyHomePageLoads();
        for (let i = 0; i < 5; i++) {
            cy.get(selectors.homeLogin).type('wrongUser35463456');
            cy.get(selectors.homePass).type('wrongPass365356435');
            cy.get(selectors.homeBtn).click();
            cy.wait(1000);
        }

        cy.get('#captcha').should('be.visible');
    });

    it('should prevent automated logins if CAPTCHA is present', () => {
        cy.verifyHomePageLoads();

        for (let i = 0; i < 5; i++) {
            cy.get(selectors.homeLogin).type('wrongUser345635636');
            cy.get(selectors.homePass).type('wrongPass35634653');
            cy.get(selectors.homeBtn).click();
            cy.wait(1000);
        }

        cy.get('#captcha').should('be.visible');
        cy.get('#captcha-input').type('fakeCaptchaValue');
        cy.get(selectors.submitClk).click();

        cy.contains('Incorrect CAPTCHA').should('be.visible');
    });
});
