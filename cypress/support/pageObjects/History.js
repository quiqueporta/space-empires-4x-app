class History {

  visit() {
    cy.get('#cps-tab___BV_tab_button__').click();
  }

  getHistory() {
    return cy.get('[data-test=history]');
  }

  undo() {
    cy.get('[data-test=undo]').click();
  }

}

export default History;
