class CPs {

  visit() {
    cy.visit('http://localhost:8080/');
    cy.get('#cps-tab___BV_tab_button__').click();
  }

  getCurrentCPs() {
    return cy.get('[data-test=currentColonyPoints]');
  }

  getCurrentCPsInput() {
    return cy.get('[data-test=colonyPoints]');
  }

  addCPs(quantity) {
    cy.get('[data-test=colonyPoints]').clear().type(quantity);
    cy.get('[data-test=addColonyPointsButton]').click();
  }

}

export default CPs;
