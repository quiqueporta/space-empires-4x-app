import CPs from '../support/pageObjects/CPs';
import History from '../support/pageObjects/History';

describe('Add colony points', () => {
  it('increases the current colony points', () => {
    const cps = new CPs();
    cps.visit();

    cps.addCPs('5');

    cps.getCurrentCPs()
      .should('have.text', '5');
  })
  it('remembers the last increased value', () => {
    const cps = new CPs();
    cps.visit();

    cps.addCPs('15');

    cps.getCurrentCPsInput()
      .should('have.value', '15');
  })
  it('registers the command on the history tab', () => {
    const cps = new CPs();
    const history = new History();
    cps.visit();

    cps.addCPs('5');

    history.visit();
    history.getHistory().should('contain', 'Added 5 Colony Points.')
  })
  it('discounts the added colony points when command is undo', () => {
    const cps = new CPs();
    const history = new History();
    cps.visit();
    cps.addCPs('5');

    history.visit();
    history.undo()

    cps.getCurrentCPs()
      .should('have.text', '0')
    history.visit();
    history.getHistory()
      .should('not.contain', 'Added 5 Colony Points.')
  })
})
