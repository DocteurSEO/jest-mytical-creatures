const CreatureService = require('../CreatureService');

describe('CreatureService', () => {
  let creatureService;

  beforeEach(() => {
    creatureService = new CreatureService();
  });

  describe('Initialisation', () => {
    test('devrait créer des créatures par défaut à l\'initialisation', () => {
      const creatures = creatureService.getAllCreatures();
      expect(creatures).toHaveLength(5);
      expect(creatures[0].name).toBe('Dragon Rouge');
      expect(creatures[1].name).toBe('Phénix Doré');
    });
  });

  describe('createCreature', () => {
    test('devrait créer une nouvelle créature avec des paramètres valides', () => {
      const creature = creatureService.createCreature('Basilic', 'Serpent', 70, 90);
      
      expect(creature.name).toBe('Basilic');
      expect(creature.type).toBe('Serpent');
      expect(creature.power).toBe(70);
      expect(creature.health).toBe(90);
      expect(creatureService.getAllCreatures()).toHaveLength(6);
    });

    test('devrait lever une erreur si des paramètres sont manquants', () => {
      expect(() => {
        creatureService.createCreature('Test', null, 50, 100);
      }).toThrow('Tous les paramètres sont requis');
    });

    test('devrait lever une erreur si la puissance est invalide', () => {
      expect(() => {
        creatureService.createCreature('Test', 'Type', 150, 100);
      }).toThrow('La puissance doit être entre 1 et 100');
      
      expect(() => {
        creatureService.createCreature('Test', 'Type', 0, 100);
      }).toThrow('La puissance doit être entre 1 et 100');
    });

    test('devrait lever une erreur si la santé est invalide', () => {
      expect(() => {
        creatureService.createCreature('Test', 'Type', 50, 250);
      }).toThrow('La santé doit être entre 1 et 200');
      
      expect(() => {
        creatureService.createCreature('Test', 'Type', 50, 0);
      }).toThrow('La santé doit être entre 1 et 200');
    });
  });

  describe('battleCreatures', () => {
    test('devrait permettre un combat entre deux créatures', () => {
      const creatures = creatureService.getAllCreatures();
      const attacker = creatures[0];
      const defender = creatures[1];
      
      const result = creatureService.battleCreatures(attacker.id, defender.id);
      
      expect(result.success).toBe(true);
      expect(result.damage).toBeGreaterThan(0);
      expect(result.attacker.id).toBe(attacker.id);
      expect(result.defender.id).toBe(defender.id);
    });

    test('devrait lever une erreur si une créature n\'existe pas', () => {
      const creatures = creatureService.getAllCreatures();
      
      expect(() => {
        creatureService.battleCreatures('inexistant', creatures[0].id);
      }).toThrow('Créature non trouvée');
    });
  });

  describe('getAliveCreatures', () => {
    test('devrait retourner seulement les créatures vivantes', () => {
      const creatures = creatureService.getAllCreatures();
      const firstCreature = creatureService.getCreatureById(creatures[0].id);
      
      // Tuer une créature
      firstCreature.takeDamage(firstCreature.health);
      
      const aliveCreatures = creatureService.getAliveCreatures();
      expect(aliveCreatures).toHaveLength(4);
      expect(aliveCreatures.every(c => c.isAlive)).toBe(true);
    });
  });
});