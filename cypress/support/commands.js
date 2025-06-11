// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Commandes personnalisées pour l'atelier des créatures mythiques

Cypress.Commands.add('loadCreaturesAndWait', () => {
  cy.get('#load-creatures').click();
  cy.waitForCreatures();
});

Cypress.Commands.add('createTestCreature', (name, type, power, health) => {
  cy.get('#creature-name').type(name);
  cy.get('#creature-type').select(type);
  cy.get('#creature-power').type(power.toString());
  cy.get('#creature-health').type(health.toString());
  cy.get('#creature-form').submit();
  
  // Attendre que la créature soit créée et affichée
  cy.contains(name).should('be.visible');
});

Cypress.Commands.add('performBattle', (attackerIndex = 0, defenderIndex = 1) => {
  cy.selectCreatureForBattle('#attacker-select', attackerIndex);
  cy.selectCreatureForBattle('#defender-select', defenderIndex);
  cy.get('#battle-btn').should('not.be.disabled').click();
  
  // Attendre le résultat du combat
  cy.get('#battle-result').should('be.visible');
});