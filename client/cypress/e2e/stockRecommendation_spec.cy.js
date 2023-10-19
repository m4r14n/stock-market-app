describe('StockRecommendation', () => {

  it('displays required fields when recommendation is requested', () => {
    cy.visit('/');

    // Submit the form and check that the fields display errors
    cy.get('button[type="submit"]').click();
    // All the elements should contain the text 'Required'
    cy.get('#recommendation-form .MuiFormHelperText-root').should('contain', 'Required');

  });

  it('displays error when maxFunds is less than buy_price', () => {
    cy.visit('/');
    // Fill in the form and submit again
    // get the input with name 'maxFunds' and type 20
    cy.get('input[name="maxFunds"]').type('20');

    cy.get('input[placeholder="DD/MM/YYYY hh:mm:ss"]').first().type('15102023000000');
    cy.get('input[placeholder="DD/MM/YYYY hh:mm:ss"]').last().type('15102024000000');
    cy.get('button[type="submit"]').click();

    // Check that the error message is displayed
    cy.get('[data-testid="snackbar"]').should('contain', 'Not enough funds to buy stocks');
  });

  it('displays results when time is in range and amount is enought', () => {
    cy.visit('/');
    // Fill in the form and submit again
    // get the input with name 'maxFunds' and type 200
    cy.get('input[name="maxFunds"]').type('200');

    cy.get('input[placeholder="DD/MM/YYYY hh:mm:ss"]').first().type('15102023000000');
    cy.get('input[placeholder="DD/MM/YYYY hh:mm:ss"]').last().type('15102024000000');
    cy.get('button[type="submit"]').click();

    // Check that there is no error message  displayed
    cy.get('[data-testid="snackbar"]').should('not.exist');
  });

  it ('displays error when there is not profitable time in that period', () => {
    cy.visit('/');
    // Fill in the form and submit again
    // get the input with name 'maxFunds' and type 200
    cy.get('input[name="maxFunds"]').type('200');

    cy.get('input[placeholder="DD/MM/YYYY hh:mm:ss"]').first().type('15102022000000');
    cy.get('input[placeholder="DD/MM/YYYY hh:mm:ss"]').last().type('16102022000000');
    cy.get('button[type="submit"]').click();

    // Check that there the error message is displayed
    cy.get('[data-testid="snackbar"]').should('contain', 'No profitable time range found.');
  });

});