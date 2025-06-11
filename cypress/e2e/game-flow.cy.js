describe('Flux de jeu des créatures mythiques', () => {
  beforeEach(() => {
    // Réinitialiser l'état du jeu avant chaque test
    cy.resetGame();
    cy.visit('/');
  });

  it('devrait charger l\'application et afficher les créatures par défaut', () => {
    // Vérifier que la page se charge correctement
    cy.contains('Arène des Créatures Mythiques').should('be.visible');
    cy.get('#load-creatures').should('be.visible');
    
    // Charger les créatures
    cy.loadCreaturesAndWait();
    
    // Vérifier qu'il y a 5 créatures par défaut
    cy.get('[data-creature-id]').should('have.length', 5);
    
    // Vérifier que les créatures ont les bonnes informations
    cy.contains('Dragon Rouge').should('be.visible');
    cy.contains('Phénix Doré').should('be.visible');
    cy.contains('Licorne Argentée').should('be.visible');
    cy.contains('Kraken des Abysses').should('be.visible');
    cy.contains('Griffon Majestueux').should('be.visible');
    
    // Vérifier que chaque créature affiche ses stats
    cy.get('.creature-card').first().within(() => {
      cy.contains('Puissance').should('be.visible');
      cy.contains('Santé').should('be.visible');
      cy.get('.health-bar').should('be.visible');
    });
  });

  it('devrait permettre de créer une créature, organiser un combat et utiliser les fonctionnalités de soin', () => {
    // Charger les créatures existantes
    cy.loadCreaturesAndWait();
    
    // Créer une nouvelle créature
    cy.createTestCreature('Dragon de Test', 'Dragon', 80, 120);
    
    // Vérifier que la créature a été ajoutée
    cy.get('[data-creature-id]').should('have.length', 6);
    
    // Organiser un combat entre deux créatures
    cy.performBattle(0, 1);
    
    // Vérifier que le résultat du combat s'affiche
    cy.get('#battle-result').should('contain', 'Résultat du Combat');
    cy.get('#battle-result').should('contain', 'attaque');
    cy.get('#battle-result').should('contain', 'dégâts');
    
    // Vérifier que les stats des créatures sont mises à jour
    cy.get('#battle-result').within(() => {
      cy.contains('Santé').should('be.visible');
      cy.contains('Statut').should('be.visible');
    });
    
    // Recharger les créatures pour voir les dégâts
    cy.loadCreaturesAndWait();
    
    // Tester la fonction de soin sur une créature blessée
    cy.get('.creature-card').first().within(() => {
      // Vérifier qu'il y a un bouton de soin (créature vivante)
      cy.get('button').contains('Soigner').should('be.visible').click();
    });
    
    // Vérifier que le message de succès apparaît
    cy.contains('Créature soignée').should('be.visible');
    
    // Tester la réinitialisation du jeu
    cy.get('#reset-game').click();
    cy.contains('Jeu réinitialisé').should('be.visible');
    
    // Vérifier que le jeu est revenu à l'état initial
    cy.loadCreaturesAndWait();
    cy.get('[data-creature-id]').should('have.length', 5);
  });
});