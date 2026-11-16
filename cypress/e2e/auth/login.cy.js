describe('Sign in', () => {
  beforeEach(() => cy.visit('app/index.html'))

  it('shows the sign-in form first', () => {
    cy.get('[data-cy=email]').should('be.visible')
    cy.get('[data-cy=products]').should('not.be.visible')
  })

  it('signs in with a valid email and password', () => {
    cy.signIn()
    cy.get('[data-cy=products]').should('be.visible')
  })

  it('rejects a wrong password', () => {
    cy.get('[data-cy=email]').type('demo@sathi.test')
    cy.get('[data-cy=password]').type('wrong')
    cy.get('[data-cy=login]').click()
    cy.get('[data-cy=login-error]').should('have.text', 'Wrong email or password.')
  })

  it('asks for both fields when they are empty', () => {
    cy.get('[data-cy=login]').click()
    cy.get('[data-cy=login-error]').should('have.text', 'Enter your email and password.')
  })

  it('signs out', () => {
    cy.signIn()
    cy.get('[data-cy=logout]').click()
    cy.get('[data-cy=email]').should('be.visible')
  })
})
