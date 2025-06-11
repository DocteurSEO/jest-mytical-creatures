class Creature {
  constructor(name, type, power, health) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.type = type;
    this.power = power;
    this.health = health;
    this.maxHealth = health;
    this.isAlive = true;
  }

  attack(target) {
    if (!this.isAlive || !target.isAlive) {
      return { success: false, message: "Combat impossible, créature morte" };
    }
    
    const damage = this.calculateDamage();
    target.takeDamage(damage);
    
    return {
      success: true,
      damage: damage,
      message: `${this.name} attaque ${target.name} et inflige ${damage} dégâts`
    };
  }

  takeDamage(damage) {
    this.health = Math.max(0, this.health - damage);
    if (this.health === 0) {
      this.isAlive = false;
    }
  }

  heal(amount) {
    if (!this.isAlive) {
      return false;
    }
    this.health = Math.min(this.maxHealth, this.health + amount);
    return true;
  }

  calculateDamage() {
    const baseDamage = this.power;
    const randomFactor = Math.random() * 0.4 + 0.8; // 80% à 120% des dégâts de base
    return Math.floor(baseDamage * randomFactor);
  }

  getStats() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      power: this.power,
      health: this.health,
      maxHealth: this.maxHealth,
      isAlive: this.isAlive
    };
  }
}

module.exports = Creature;