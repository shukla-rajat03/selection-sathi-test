describe('Catalog', () => {
  beforeEach(() => cy.signIn())

  it('lists every product', () => {
    cy.get('[data-cy=product]').should('have.length', 4)
  })

  context('search', () => {
    it('filters products by name', () => {
      cy.get('[data-cy=search]').type('rice')
      cy.get('[data-cy=product]').should('have.length', 1).and('contain', 'Basmati Rice')
    })

    it('ignores upper and lower case', () => {
      cy.get('[data-cy=search]').type('GHEE')
      cy.get('[data-cy=product]').should('have.length', 1)
    })

    it('says so when nothing matches', () => {
      cy.get('[data-cy=search]').type('chocolate')
      cy.get('[data-cy=product]').should('not.exist')
      cy.get('[data-cy=no-results]').should('be.visible')
    })
  })
})
