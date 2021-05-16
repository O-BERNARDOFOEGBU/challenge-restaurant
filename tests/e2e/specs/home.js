// https://docs.cypress.io/api/introduction/api.html

afterEach(() => {
  cy.wait(1000);
});
describe('Homepage', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('div', 'Welcome! Your local time is');
  });

  it('renders the application header component with links', () => {
    cy.visit('/');
    cy.contains('li', 'Home');
    cy.contains('li', 'Carbonara Meals Calculator');
    cy.contains('li', 'Our Restaurants');
  });

  it('navigates to the respective link routes', () => {
    cy.visit('/');
    cy.contains('li', 'Carbonara Meals Calculator').click();
    cy.url().should('include', '/meals');

    cy.contains('li', 'Our Restaurants').click();
    cy.url().should('include', '/restaurants');

    cy.contains('li', 'Home').click();
    cy.url().should('include', '/');
  });

  it.only('toggle dark and light', () => {
    cy.visit('/');

    cy.get('#dark-theme');

    cy.get('[data-testid="theme-switch"]').click();

    cy.get('#light-theme');

    cy.get('[data-testid="theme-switch"]').click();

    cy.get('#dark-theme');
  });
});
