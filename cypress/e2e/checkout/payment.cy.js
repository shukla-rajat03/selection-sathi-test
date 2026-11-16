// Test titles built in code: one test per card brand.
const CARDS = [
  { brand: 'Visa', number: '4242 4242 4242 4242' },
  { brand: 'Mastercard', number: '5555 5555 5555 4444' },
  { brand: 'Amex', number: '3782 822463 10005' },
]
const nextYear = String((new Date().getFullYear() + 1) % 100).padStart(2, '0')

describe('Payment', () => {
  beforeEach(() => {
    cy.signIn()
    cy.get('[data-cy=add][data-id=tea]').click()
  })

  CARDS.forEach(({ brand, number }) => {
    it(`accepts a ${brand} card`, () => {
      cy.get('[data-cy=card]').type(number)
      cy.get('[data-cy=expiry]').type(`12/${nextYear}`)
      cy.get('[data-cy=pay]').click()
      cy.get('[data-cy=pay-msg]').should('contain', 'Payment of ₹120 received')
    })
  })

  context('validation', () => {
    it('rejects a card number with a typo', () => {
      cy.get('[data-cy=card]').type('4242 4242 4242 4241')
      cy.get('[data-cy=expiry]').type(`12/${nextYear}`)
      cy.get('[data-cy=pay]').click()
      cy.get('[data-cy=pay-msg]').should('have.text', 'Card number is not valid.')
    })

    it('rejects an expired card', () => {
      cy.get('[data-cy=card]').type('4242424242424242')
      cy.get('[data-cy=expiry]').type('01/20')
      cy.get('[data-cy=pay]').click()
      cy.get('[data-cy=pay-msg]').should('have.text', 'This card has expired.')
    })
  })
})
