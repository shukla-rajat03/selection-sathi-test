// Tests that exist to show how the portal reports each outcome.
// Delete this file once you have seen them.

// Fails on its first attempt only: the counter lives at file level, so it
// survives the retry (cypress.config.js sets one retry in `cypress run`).
let attempts = 0

describe('Portal showcase', () => {
  it('passes on the second attempt (reported as flaky)', () => {
    attempts += 1
    cy.visit('app/index.html')
    cy.wrap(attempts).should('be.gte', 2)
  })

  it('fails on purpose, with a screenshot of the page', () => {
    cy.signIn()
    cy.get('[data-cy=add][data-id=tea]').click()
    cy.get('[data-cy=total]').should('have.text', '₹999')
  })

  it.skip('is skipped by its author', () => {})
})
