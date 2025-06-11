const Creature = require('../models/Creature');

class CreatureService {
  constructor() {
    this.creatures = [];
    this.initializeDefaultCreatures();
  }

  initializeDefaultCreatures() {
    const defaultCreatures = [
      { name: "Dragon Rouge", type: "Dragon", power: 85, health: 120 },
      { name: "Phénix Doré", type: "Oiseau", power: 70, health: 100 },
      { name: "Licorne Argentée", type: "Équidé", power: 60, health: 110 },
      { name: "Kraken des Abysses", type: "Céphalopode", power: 90, health: 140 },
      { name: "Griffon Majestueux", type: "Hybride", power: 75, health: 105 }
    ];

    this.creatures = defaultCreatures.map(data => 
      new Creature(data.name, data.type, data.power, data.health)
    );
  }

  getAllCreatures() {
    return this.creatures.map(creature => creature.getStats());
  }

  getCreatureById(id) {
    return this.creatures.find(creature => creature.id === id);
  }

  createCreature(name, type, power, health) {
    if (!name || !type || !power || !health) {
      throw new Error("Tous les paramètres sont requis");
    }
    
    if (power < 0 || power > 200) {
      throw new Error("La puissance doit être entre 1 et 100");
    }
    
    if (health < 1 || health > 300) {
      throw new Error("La santé doit être entre 1 et 200");
    }

    

    const creature = new Creature(name, type, power, health);
    this.creatures.push(creature);
    return creature.getStats();
  }

  battleCreatures(attacker_id, defender_id) {
    const attacker = this.getCreatureById(attacker_id);
    const defender = this.getCreatureById(defender_id);

    if (!attacker || !defender) {
      throw new Error("Créature non trouvée");
    }

    const result = attacker.attack(defender);
    
    return {
      ...result,
      attacker: attacker.getStats(),
      defender: defender.getStats()
    };
  }

  healCreature(id, amount) {
    const creature = this.getCreatureById(id);
    if (!creature) {
      throw new Error("Créature non trouvée");
    }

    const success = creature.heal(amount);
    return {
      success,
      creature: creature.getStats()
    };
  }

  getAliveCreatures() {
    return this.creatures
      .filter(creature => creature.isAlive)
      .map(creature => creature.getStats());
  }

  resetAllCreatures() {
    this.creatures = [];
    this.initializeDefaultCreatures();
    return this.getAllCreatures();
  }
}

module.exports = CreatureService;