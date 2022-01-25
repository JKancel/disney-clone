import { getMain } from '../support/app.po';

describe('disney-clone', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Function helper example, see `../support/app.po.ts` file
    getMain().should('have.class', 'main-app')
  });
});
