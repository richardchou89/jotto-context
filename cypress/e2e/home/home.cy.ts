describe('Home', () => {
  it('loads successfully', () => {
    cy.visit('/')
  })

  it('displays header', () => {
    cy.visit('/')
    cy.contains('Jotto')
  })

  it('should show guessed words', () => {
    cy.intercept('GET', 'http://localhost:3030', {
      statusCode: 200,
      body: JSON.stringify('bicycle')
    }).as('getSecret')

    cy.visit('/')
    cy.wait('@getSecret')
    cy.get('input').type('party')
    cy.get('.btn').click()
    cy.get('.table tbody').children().should('have.length', 1)
    cy.get('.table tbody tr:first td:first').contains('party')
    cy.get('.table tbody tr:first td:last').contains('1')

    cy.get('input').type('bicycle')
    cy.get('.btn').click()
    cy.get('.table tbody tr:last td:first').contains('bicycle')
    cy.get('.table tbody tr:last td:last').contains('7')
  })

  it('should show instructions', () => {
    cy.intercept('GET', 'http://localhost:3030', {
      statusCode: 200,
      body: JSON.stringify('bicycle')
    }).as('getSecret')

    cy.visit('/')
    cy.wait('@getSecret')
    cy.contains('Try to guess the secret word!')
  })

  it('should show congrats', () => {
    cy.intercept('GET', 'http://localhost:3030', {
      statusCode: 200,
      body: JSON.stringify('bicycle')
    }).as('getSecret')

    cy.visit('/')
    cy.wait('@getSecret')
    cy.get('input').type('bicycle')
    cy.get('.btn').click()
    cy.contains('Congratulations! You guessed the word!')
  })

  it('should show guess prompt in emoji', () => {
    cy.intercept('GET', 'http://localhost:3030', {
      statusCode: 200,
      body: JSON.stringify('bicycle')
    }).as('getSecret')

    cy.visit('/')
    cy.wait('@getSecret')
    cy.get("[data-test='language-icon']").filter(":contains('😊')").click()
    cy.contains('🤔🤫🔤')
  })

  it('should show submit in emoji', () => {
    cy.intercept('GET', 'http://localhost:3030', {
      statusCode: 200,
      body: JSON.stringify('bicycle')
    }).as('getSecret')

    cy.visit('/')
    cy.wait('@getSecret')
    cy.get("[data-test='language-icon']").filter(":contains('😊')").click()
    cy.contains('🚀')
  })
})