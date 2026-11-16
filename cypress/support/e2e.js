// Opens the demo page and signs in through the form.
Cypress.Commands.add('signIn', () => {
  cy.fixture('user').then(({ email, password }) => {
    cy.visit('app/index.html')
    cy.get('[data-cy=email]').type(email)
    cy.get('[data-cy=password]').type(password, { log: false })
    cy.get('[data-cy=login]').click()
    cy.get('[data-cy=welcome]').should('contain', email)
  })
})
