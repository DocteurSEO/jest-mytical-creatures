const Creature = require('../Creature');

describe('Creature', () => {
  let dragon, unicorn;

  beforeEach(() => {
    dragon = new Creature('Dragon Rouge', 'Dragon', 85, 120);
    unicorn = new Creature('Licorne Argentée', 'Équidé', 60, 110);
  });

  describe('Création d\'une créature', () => {
    test('devrait créer une créature avec les bonnes propriétés', () => {
      expect(dragon.name).toBe('Dragon Rouge');
      expect(dragon.type).toBe('Dragon');
      expect(dragon.power).toBe(85);
      expect(dragon.health).toBe(120);
      expect(dragon.maxHealth).toBe(120);
      expect(dragon.isAlive).toBe(true);
      expect(dragon.id).toBeDefined();
    });

    test('devrait générer un ID unique pour chaque créature', () => {
      const dragon2 = new Creature('Dragon Bleu', 'Dragon', 80, 100);
      expect(dragon.id).not.toBe(dragon2.id);
    });
  });

  describe('Méthode attack', () => {
    test('devrait permettre à une créature d\'attaquer une autre', () => {
      const initialHealth = unicorn.health;
      const result = dragon.attack(unicorn);
      
      expect(result.success).toBe(true);
      expect(result.damage).toBeGreaterThan(0);
      expect(result.message).toContain('attaque');
      expect(unicorn.health).toBeLessThan(initialHealth);
    });

    test('ne devrait pas permettre l\'attaque si l\'attaquant est mort', () => {
      dragon.health = 0;
      dragon.isAlive = false;
      
      const result = dragon.attack(unicorn);
      expect(result.success).toBe(false);
      expect(result.message).toContain('Combat impossible');
    });

    test('ne devrait pas permettre l\'attaque si la cible est morte', () => {
      unicorn.health = 0;
      unicorn.isAlive = false;
      
      const result = dragon.attack(unicorn);
      expect(result.success).toBe(false);
      expect(result.message).toContain('Combat impossible');
    });
  });

  describe('Méthode takeDamage', () => {
    test('devrait réduire la santé de la créature', () => {
      const initialHealth = dragon.health;
      dragon.takeDamage(30);
      
      expect(dragon.health).toBe(initialHealth - 30);
      expect(dragon.isAlive).toBe(true);
    });

    test('devrait marquer la créature comme morte si la santé atteint 0', () => {
      dragon.takeDamage(dragon.health);
      
      expect(dragon.health).toBe(0);
      expect(dragon.isAlive).toBe(false);
    });

    test('ne devrait pas permettre à la santé de devenir négative', () => {
      dragon.takeDamage(dragon.health + 50);
      
      expect(dragon.health).toBe(0);
      expect(dragon.isAlive).toBe(false);
    });
  });

  describe('Méthode heal', () => {
    test('devrait soigner une créature vivante', () => {
      dragon.takeDamage(40);
      const result = dragon.heal(20);
      
      expect(result).toBe(true);
      expect(dragon.health).toBe(100); // 120 - 40 + 20
    });

    test('ne devrait pas permettre de dépasser la santé maximale', () => {
      dragon.heal(50);
      
      expect(dragon.health).toBe(dragon.maxHealth);
    });

    test('ne devrait pas soigner une créature morte', () => {
      dragon.health = 0;
      dragon.isAlive = false;
      
      const result = dragon.heal(50);
      expect(result).toBe(false);
      expect(dragon.health).toBe(0);
    });
  });
});