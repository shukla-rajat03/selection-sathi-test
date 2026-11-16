# selection-sathi-test

Cypress tests for **Sathi Shop**, a one-page demo shop in `app/index.html`
(sign in, search products, cart with coupons, card payment). The page needs no
server: the tests open it with `cy.visit('app/index.html')`.

Demo account: `demo@sathi.test` / `Passw0rd!` (also in `cypress/fixtures/user.json`).

| Spec | What it covers |
|---|---|
| `cypress/e2e/auth/login.cy.js` | sign in, wrong password, empty fields, sign out |
| `cypress/e2e/shop/catalog.cy.js` | product list and search |
| `cypress/e2e/shop/cart.cy.js` | adding, quantities, removing, coupons |
| `cypress/e2e/checkout/payment.cy.js` | one test per card brand, card and expiry checks |
| `cypress/e2e/demo/portal-showcase.cy.js` | a flaky test, a failing test and a skipped one, to see how each is reported |

## Run locally

```bash
npx cypress@13.15.2 run          # all specs, headless
npx cypress@13.15.2 open         # interactive
```
