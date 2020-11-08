describe('Add colony points', () => {
  it('increases the current colony points', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-test=colonyPoints]').clear().type('5')
    cy.get('[data-test=addColonyPointsButton]').click()

    cy.get('[data-test=currentColonyPoints]')
      .should('have.text', '5')
  })
  it('remembers the last increased value', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-test=colonyPoints]').clear().type('5')
    cy.get('[data-test=addColonyPointsButton]').click()

    cy.get('[data-test=colonyPoints]')
      .should('have.value', '5')
  })
  it('registers the command on the history tab', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-test=colonyPoints]').clear().type('5')
    cy.get('[data-test=addColonyPointsButton]').click()

    cy.get('[data-test=history]').should('contain', 'Added 5 Colony Points.')
  })
  it('discounts the added colony points when command is undo', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-test=colonyPoints]').clear().type('5')
    cy.get('[data-test=addColonyPointsButton]').click()

    cy.get('[data-test=historyTab]').click()
    cy.get('[data-test=undo]').click()

    cy.get('[data-test=currentColonyPoints]')
      .should('have.text', '0')
    cy.get('[data-test=history]')
      .should('not.contain', 'Added 5 Colony Points.')
  })
})
