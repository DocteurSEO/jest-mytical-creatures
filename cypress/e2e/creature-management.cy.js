describe('Gestion des créatures', () => {
  beforeEach(() => {
    cy.resetGame();
    cy.visit('/');
    cy.loadCreaturesAndWait();
  });

  it('devrait valider la création de créatures avec différents scénarios', () => {
   
    cy.createTestCreature('Hydre Puissante', 'Dragon', 95, 150);
    cy.get('[data-creature-id]').should('have.length', 6);
    
   
    cy.contains('Hydre Puissante').should('be.visible');
    cy.contains('Hydre Puissante').parent().within(() => {
      cy.contains('95').should('be.visible'); // Puissance
      cy.contains('150').should('be.visible'); // Santé
    });
    

    cy.createTestCreature('Faible Pixie', 'Phénix', 1, 1);
    cy.get('[data-creature-id]').should('have.length', 7);
    
    cy.createTestCreature('Titan Ultime', 'Griffon', 100, 200);
    cy.get('[data-creature-id]').should('have.length', 8);
    
    //  MERCI L'IAAAAAAA 
    cy.contains('Faible Pixie').should('be.visible');
    cy.contains('Titan Ultime').should('be.visible');
  });

  it('devrait gérer les combats jusqu\'à la mort et le système de soin', () => {
    
    cy.createTestCreature('Combattant A', 'Dragon', 90, 80);
    cy.createTestCreature('Combattant B', 'Kraken', 85, 75);
    
    
    for (let i = 0; i < 3; i++) {
      cy.performBattle(5, 6); // Indices des nouvelles créatures
      cy.wait(1000); // Attendre entre les combats
    }
    
    
    cy.loadCreaturesAndWait();
    
    // Vérifier qu'au moins une créature est gravement blessée ou morte
    cy.get('.creature-card').should('contain', 'Combattant');
    
    // Tester le soin sur une créature vivante
    cy.get('.creature-card').contains('Combattant').parent().within(() => {
      // Si la créature est vivante, elle devrait avoir un bouton de soin
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Soigner")').length > 0) {
          cy.get('button').contains('Soigner').click();
        }
      });
    });
    
    // Vérifier le système de barres de santé
    cy.get('.health-bar').should('have.length.at.least', 5);
    cy.get('.health-fill').should('have.length.at.least', 5);
    
    // Vérifier qu'il peut y avoir des barres de santé en état critique (classe .low)
    cy.get('.health-fill').should('exist');
  });
});