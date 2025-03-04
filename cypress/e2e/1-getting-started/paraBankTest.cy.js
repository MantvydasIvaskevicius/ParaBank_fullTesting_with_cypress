import selectors from '../../support/selectors';

describe('ParaBank homePage functionalities', () => {
    beforeEach(() => {
        cy.verifyHomePageLoads();
    });

    it('Verify the logo is clickable and redirects to the correct URL.', () => {
        cy.get(selectors.homePageLogo).trigger('mouseover').should('have.css', 'cursor', 'pointer').click();
        cy.homePageVisible();
    });

    it('Verifying the top left column contains 5 elements', () => {
        cy.get(selectors.leftMenu).should('exist');
        cy.get(selectors.leftMenu).find('li').should('have.length', 6);
    });

    it('Verifying ATM Services column', () => {
        cy.get(selectors.services).find("li").should('have.length', 5);
        const expectedTexts = ['ATM Services', 'Withdraw Funds', 'Transfer Funds', 'Check Balances', 'Make Deposits'];
        expectedTexts.forEach((text, index) => {
            cy.get(selectors.services).find("li").eq(index).should('have.text', text).trigger('mouseover').should('have.css', 'cursor', 'auto');
        });
    });

    it('Verifying Online Services column', () => {
        cy.get(selectors.onlineServices).find("li").should('have.length', 4);
        const expectedTexts = ['Online Services', 'Bill Pay', 'Account History', 'Transfer Funds'];
        expectedTexts.forEach((text, index) => {
            cy.get(selectors.onlineServices).find("li").eq(index).should('have.text', text).trigger('mouseover').should('have.css', 'cursor', 'auto');
        });
    });

    it('Verifying if the third column of the box holds 4 elements', () => {
        cy.get(selectors.events).find("li").should('have.length', 4);
    });

    it('Verifying clicking on first READMORE, will redirect to expected url', () => {
        cy.contains('a', 'Read More').click()
        cy.get(selectors.firstReadmeTitle).should('be.visible').and('have.text', 'Available Bookstore SOAP services:');
    });

    it('Verifying clicking on second READMORE, will redirect to expected url', () => {
        cy.get(selectors.secondReadme).click();
        cy.get(selectors.secondReadmeTitle).should('be.visible').and('have.text', 'ParaBank News');
    });

    it("Check that the home page 'Register' link are visible", () => {
        cy.contains('Register').should('exist').and('be.visible');
    });

    it('Click on the "Register" link', () => {
        cy.contains('Register').click();
    });

});