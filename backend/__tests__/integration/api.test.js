const request = require('supertest');
const app = require('../../server');

describe('API Integration Tests', () => {
  describe('GET /api/creatures', () => {
    test('devrait retourner toutes les créatures', async () => {
      const response = await request(app)
        .get('/api/creatures')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(5);
      expect(response.body.data[0]).toHaveProperty('name');
      expect(response.body.data[0]).toHaveProperty('type');
      expect(response.body.data[0]).toHaveProperty('power');
      expect(response.body.data[0]).toHaveProperty('health');
    });
  });

  describe('POST /api/creatures', () => {
    test('devrait créer une nouvelle créature avec des données valides', async () => {
      const newCreature = {
        name: 'Test Dragon',
        type: 'Dragon',
        power: 75,
        health: 100
      };

      const response = await request(app)
        .post('/api/creatures')
        .send(newCreature)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(newCreature.name);
      expect(response.body.data.type).toBe(newCreature.type);
      expect(response.body.data.power).toBe(newCreature.power);
      expect(response.body.data.health).toBe(newCreature.health);
    });

    test('devrait rejeter une créature avec des données invalides', async () => {
      const invalidCreature = {
        name: 'Test Dragon',
        type: 'Dragon',
        power: 150, // Invalide (> 100)
        health: 100
      };

      const response = await request(app)
        .post('/api/creatures')
        .send(invalidCreature)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('puissance');
    });
  });

  describe('POST /api/battle', () => {
    let creatureIds;

    beforeEach(async () => {
      // Récupérer les IDs des créatures par défaut
      const response = await request(app).get('/api/creatures');
      creatureIds = response.body.data.map(c => c.id);
    });

    test('devrait permettre un combat entre deux créatures', async () => {
      const battleData = {
        attacker_id: creatureIds[0],
        defender_id: creatureIds[1]
      };

      const response = await request(app)
        .post('/api/battle')
        .send(battleData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('damage');
      expect(response.body.data).toHaveProperty('attacker');
      expect(response.body.data).toHaveProperty('defender');
      expect(response.body.data.damage).toBeGreaterThan(0);
    });

    test('devrait rejeter un combat avec des IDs manquants', async () => {
      const battleData = {
        attacker_id: creatureIds[0]
        // defender_id manquant
      };

      const response = await request(app)
        .post('/api/battle')
        .send(battleData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('requis');
    });
  });

  describe('POST /api/creatures/:id/heal', () => {
    let creatureId;

    beforeEach(async () => {
      const response = await request(app).get('/api/creatures');
      creatureId = response.body.data[0].id;
      
      // Blesser la créature d'abord
      await request(app)
        .post('/api/battle')
        .send({
          attacker_id: response.body.data[1].id,
          defender_id: creatureId
        });
    });

    test('devrait soigner une créature', async () => {
      const healData = { amount: 30 };

      const response = await request(app)
        .post(`/api/creatures/${creatureId}/heal`)
        .send(healData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.success).toBe(true);
      expect(response.body.data.creature).toHaveProperty('health');
    });

    test('devrait rejeter un soin avec un montant invalide', async () => {
      const healData = { amount: -10 };

      const response = await request(app)
        .post(`/api/creatures/${creatureId}/heal`)
        .send(healData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('invalide');
    });
  });

  describe('POST /api/reset', () => {
    test('devrait réinitialiser toutes les créatures', async () => {
      // D'abord, créer une nouvelle créature
      await request(app)
        .post('/api/creatures')
        .send({
          name: 'Temp Dragon',
          type: 'Dragon',
          power: 50,
          health: 100
        });

      // Vérifier qu'il y a 6 créatures
      let response = await request(app).get('/api/creatures');
      expect(response.body.data).toHaveLength(6);

      // Réinitialiser
      response = await request(app)
        .post('/api/reset')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(5); // Retour aux créatures par défaut

      // Vérifier que la réinitialisation a fonctionné
      response = await request(app).get('/api/creatures');
      expect(response.body.data).toHaveLength(5);
    });
  });
});