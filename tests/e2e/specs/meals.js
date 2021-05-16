// https://docs.cypress.io/api/introduction/api.html

afterEach(() => {
  cy.wait(1000);
});
describe('Meals Page', () => {
  it('Visits the meals page', () => {
    cy.visit('/meals');
    cy.contains('h1', 'Pasta carbonara meals');
  });

  it('renders the recipe form', () => {
    cy.visit('/meals');

    cy.get('.recipe-form__form').within(() => {
      cy.contains('label', 'Eggs');
      cy.contains('label', 'Pasta');
      cy.contains('label', 'Butter');
      cy.contains('label', 'Milk');
      cy.contains('label', 'Oil');
      cy.contains('label', 'Bacon');
      cy.contains('button', 'Calculate');
    });
  });

  it('allows changing the inputs and updates accordingly', () => {
    cy.visit('/meals');

    cy.get('.recipe-form__form').within(() => {
      cy.get('[data-testid="eggs"]').type(3);
      cy.get('[data-testid="pasta"]').type(400);
      cy.get('[data-testid="butter"]').type(300);
      cy.get('[data-testid="milk"]').type(300);
      cy.get('[data-testid="oil"]').type(300);
      cy.get('[data-testid="bacon"]').type(300);
    });

    cy.get('.recipe-form__form').within(() => {
      cy.get('[data-testid="eggs"]').should('have.value', '3');
      cy.get('[data-testid="pasta"]').should('have.value', '400');
      cy.get('[data-testid="butter"]').should('have.value', '300');
      cy.get('[data-testid="milk"]').should('have.value', '300');
      cy.get('[data-testid="oil"]').should('have.value', '300');
      cy.get('[data-testid="bacon"]').should('have.value', '300');
    });
  });

  it('redirects to the receipe details page after calculating the number of meals', () => {
    cy.visit('/meals');

    cy.get('.recipe-form__form').within(() => {
      cy.get('[data-testid="eggs"]').type(3);
      cy.get('[data-testid="pasta"]').type(1030);
      cy.get('[data-testid="butter"]').type(1010);
      cy.get('[data-testid="milk"]').type(405);
      cy.get('[data-testid="oil"]').type(300);
      cy.get('[data-testid="bacon"]').type(410);

      cy.get('[data-testid="submit"]').click();
    });

    cy.url().should('include', '/recipe-details');
    cy.get('[data-testid="meals-label"]').contains(
      'Amount of Meals you can make with your ingredients:'
    );
    cy.get('[data-testid="meals-value"]').contains('2');
  });
});
