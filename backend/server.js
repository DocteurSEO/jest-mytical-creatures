const express = require('express');
const cors = require('cors');
const CreatureService = require('./src/services/CreatureService');

const app = express();
const PORT = process.env.PORT || 3001;
const creatureService = new CreatureService();

app.use(cors());
app.use(express.json());

// Routes API
app.get('/api/creatures', (req, res) => {
  try {
    const creatures = creatureService.getAllCreatures();
    res.json({ success: true, data: creatures });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/creatures/alive', (req, res) => {
  try {
    const creatures = creatureService.getAliveCreatures();
    res.json({ success: true, data: creatures });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/creatures/:id', (req, res) => {
  try {
    const creature = creatureService.getCreatureById(req.params.id);
    if (!creature) {
      return res.status(404).json({ success: false, message: 'Créature non trouvée' });
    }
    res.json({ success: true, data: creature.getStats() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/creatures', (req, res) => {
  try {
    const { name, type, power, health } = req.body;
    const creature = creatureService.createCreature(name, type, power, health);
    res.status(201).json({ success: true, data: creature });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post('/api/battle', (req, res) => {
  try {
    const { attacker_id, defender_id } = req.body;
    if (!attacker_id || !defender_id) {
      return res.status(400).json({ 
        success: false, 
        message: 'attacker_id et defender_id sont requis' 
      });
    }
    
    const result = creatureService.battleCreatures(attacker_id, defender_id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post('/api/creatures/:id/heal', (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Montant de soin invalide' 
      });
    }
    
    const result = creatureService.healCreature(req.params.id, amount);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post('/api/reset', (req, res) => {
  try {
    const creatures = creatureService.resetAllCreatures();
    res.json({ success: true, data: creatures });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🐉 Serveur API des créatures mythiques démarré sur le port ${PORT}`);
  });
}

module.exports = app;