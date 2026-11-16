const add = (id) => cy.get(`[data-cy=add][data-id=${id}]`).click()

describe('Cart', () => {
  beforeEach(() => cy.signIn())

  it('starts empty', () => {
    cy.get('[data-cy=cart-empty]').should('be.visible')
    cy.get('[data-cy=total]').should('have.text', '₹0')
  })

  it('adds items and adds up the total', () => {
    add('tea')
    add('rice')
    cy.get('[data-cy=cart-line]').should('have.length', 2)
    cy.get('[data-cy=total]').should('have.text', '₹300')
  })

  it('counts the same item twice as quantity 2', () => {
    add('dal')
    add('dal')
    cy.get('[data-cy=cart-line][data-id=dal] [data-cy=qty]').should('have.text', '2')
    cy.get('[data-cy=total]').should('have.text', '₹320')
  })

  it('removes an item', () => {
    add('tea')
    cy.get('[data-cy=remove][data-id=tea]').click()
    cy.get('[data-cy=cart-empty]').should('be.visible')
  })

  context('coupons', () => {
    beforeEach(() => add('ghee')) // ₹340

    it('takes 10% off with SAVE10', () => {
      cy.get('[data-cy=coupon]').type('save10')
      cy.get('[data-cy=apply-coupon]').click()
      cy.get('[data-cy=coupon-msg]').should('contain', 'SAVE10 applied')
      cy.get('[data-cy=total]').should('have.text', '₹306')
    })

    it('refuses an unknown coupon', () => {
      cy.get('[data-cy=coupon]').type('FREE100')
      cy.get('[data-cy=apply-coupon]').click()
      cy.get('[data-cy=coupon-msg]').should('have.text', 'This coupon is not valid.')
      cy.get('[data-cy=total]').should('have.text', '₹340')
    })
  })
})
