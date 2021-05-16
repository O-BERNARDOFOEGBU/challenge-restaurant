afterEach(() => {
  cy.wait(1000);
});
describe('Restaurants Page', () => {
  it('Visits the Restaurants page', () => {
    cy.visit('/restaurants');

    cy.get('[data-testid="heading"]').contains(
      'Here you can find all of our restaurants.'
    );
  });

  it('can filter the restaurants by name', () => {
    cy.visit('/restaurants');

    cy.get('[data-testid="search-input"]').type('001');

    cy.get('.store-list__item').contains('001');

    cy.get('[data-testid="search-input"]').clear();
    cy.get('[data-testid="search-input"]').type('5000');

    cy.get('.store-list__item').contains('5000');

    cy.get('[data-testid="search-input"]').clear();
    cy.get('[data-testid="search-input"]').type('9999');

    cy.get('.store-list__item').contains('9999');
  });

  it('view stores on different pages', () => {
    cy.visit('/restaurants');

    cy.get('[data-testid="nextPage"]').click();

    cy.get('.store-list__item').contains('15');

    cy.get('[data-testid="previousPage"]').click();

    cy.get('.store-list__item').contains('5');

    cy.get('[data-testid="lastPage"]').click();

    cy.get('.store-list__item').contains('9999');

    cy.get('[data-testid="firstPage"]').click();

    cy.get('.store-list__item').contains('4');
  });

  it('view details of each store', () => {
    cy.visit('/restaurants');

    cy.get('.store-list__item:first').click();

    cy.url().should('include', '/restaurants/1');

    cy.get('.store').contains('Store 001');
    cy.get('header').contains('Joke of the day');
  });
});
