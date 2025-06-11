// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Configuration globale pour l'atelier
Cypress.on('uncaught:exception', (err, runnable) => {
  // Empêcher Cypress de planter sur les erreurs JS non capturées
  // Ce qui peut arriver pendant les tests d'apprentissage
  return false;
});

// Commandes personnalisées pour l'atelier
Cypress.Commands.add('resetGame', () => {
  cy.request('POST', 'http://localhost:3001/api/reset');
});

Cypress.Commands.add('waitForCreatures', () => {
  cy.get('[data-creature-id]', { timeout: 10000 }).should('have.length.at.least', 1);
});

Cypress.Commands.add('selectCreatureForBattle', (selectId, creatureIndex = 0) => {
  cy.get(selectId).select(creatureIndex + 1); // +1 car le premier est "Choisir une créature"
});