# 🐉 Atelier Tests - Arène des Créatures Mythiques
 
 
## Salutation jeune padawan futur dev ou jeune titokeur,

Au lieu de te balancer un cours **chiant** sur Docker, Docker Compose, Node, Express, JS,  
et même les tests avec **Jest** et **Cypress**…  
je t’ai préparé **un atelier**. 

---

###  Pourquoi ?

Parce que ton cerveau a trop été ramolli par l’IA, et que tu ne pratiques plus.  
L’info est dispo partout maintenant :

- Tu tapes `"Explique-moi Jest"` à ChatGPT → il t’explique.
- Tu demandes un cours sur Cypress → il te le fait.
- Même sur YouTube, t’as des tutos pour **tout**…

---

Mais voilà : **mon but**, c’est de *réactiver ton cerveau*. ⚡  
Apprendre par la pratique, avec **un projet concret**.

Tu ne connais pas un truc ?  
> Va voir l’IA, demande-lui d’expliquer.  
> Ensuite, regarde une vidéo ou — soyons fous — **lis la doc** (oui, ça existe encore…).

---

###  Bref.

> **Un développeur, ça code.**  
> **Ça réfléchit.**


[![Regarder la vidéo](https://img.youtube.com/vi/Tu7QHJnCE9c/hqdefault.jpg)](https://youtu.be/Tu7QHJnCE9c)



Voici un atelier pratique pour apprendre les tests avec **Jest** et **Cypress** à travers un mini-jeu de créatures mythiques.

## 🎯 Objectifs de l'Atelier

Cet atelier te permettra d'apprendre par la pratique :
- **Tests unitaires** avec Jest (5 tests)
- **Tests d'intégration** API avec Jest & Supertest (5 tests)  
- **Tests end-to-end** avec Cypress (2 tests)
- **Containerisation** avec Docker et Docker Compose

## 🏗️ Architecture du Projet

```
jest-workshop/
├── backend/                 # API Node.js/Express
│   ├── src/
│   │   ├── models/         # Modèles (Creature)
│   │   └── services/       # Services (CreatureService)
│   ├── __tests__/          # Tests d'intégration
│   └── server.js           # Serveur Express
├── frontend/               # Interface HTML/CSS/JS
│   ├── index.html          # Page principale
│   ├── style.css           # Styles
│   └── script.js           # Logique frontend
├── cypress/                # Tests E2E
│   └── e2e/               # Scénarios de test
└── docker-compose.yml     # Orchestration
```

Merci l'ia pour ce diagramme des familles 

## 🚀 Démarrage Rapide

### Prérequis
- Docker & Docker Compose installés
- Node.js 18 et plus (pour les tests locaux)

### 1. Lancer l'Application

```bash
# Cloner ou télécharger le projet
cd jest-mytical-creatures

# Démarrer avec Docker
npm run dev
# ou directement: docker-compose up -d
```

L'application sera accessible sur :
- 🎮 **Frontend** : http://localhost:8080
- 🔌 **API Backend** : http://localhost:3001

### 2. Installer les Dépendances (Tests Locaux)

```bash
# Dépendances backend
npm run install:backend

# Dépendances Cypress (depuis la racine)
npm install
```

## 🧪 Exécuter les Tests

### Tests Unitaires (Jest)
```bash
# Tous les tests unitaires
npm test

# Mode watch (développement)
npm run test:watch
```

**5 Tests Unitaires à Faire Passer :**
1. ✅ Création d'une créature avec bonnes propriétés
2. ✅ Génération d'ID unique pour chaque créature  
3. ✅ Attaque entre créatures avec calcul de dégâts
4. ✅ Empêcher attaque si créature morte
5. ✅ Système de soin avec validation

### Tests d'Intégration (Jest + Supertest)
```bash
# Tests d'intégration API
npm run test:integration
```

**5 Tests d'Intégration à Faire Passer :**
1. ✅ GET /api/creatures - Récupérer toutes les créatures
2. ✅ POST /api/creatures - Créer une nouvelle créature
3. ✅ POST /api/battle - Combat entre créatures
4. ✅ POST /api/creatures/:id/heal - Soigner une créature
5. ✅ POST /api/reset - Réinitialiser le jeu

### Tests End-to-End (Cypress)
```bash
# Interface graphique Cypress
npm run cypress:open

# Exécution en mode headless
npm run test:e2e
```

**2 Tests E2E à Faire Passer :**
1. ✅ **Flux de jeu complet** : Chargement → Affichage créatures → Combat → Résultat
2. ✅ **Gestion créatures** : Création → Validation → Combat multiple → Soin

## 🎮 Comment Utiliser l'Application

### Interface Web
1. **Charger les Créatures** : Cliquez sur "Charger les Créatures"
2. **Créer une Créature** : Remplissez le formulaire en bas
3. **Organiser un Combat** : Sélectionnez attaquant et défenseur, puis "COMBATTRE!"
4. **Soigner** : Cliquez sur "🩹 Soigner" sur une créature blessée
5. **Réinitialiser** : Bouton "Réinitialiser" pour revenir à l'état initial

### API Endpoints
- `GET /api/creatures` - Liste des créatures
- `POST /api/creatures` - Créer une créature
- `POST /api/battle` - Combat entre créatures
- `POST /api/creatures/:id/heal` - Soigner une créature
- `POST /api/reset` - Réinitialiser le jeu

## 📋 Missions à Accomplir

### 🥉 Niveau Débutant
- [ ] Faire passer tous les tests unitaires
- [ ] Comprendre la structure des tests Jest
- [ ] Modifier les tests pour ajouter de nouveaux cas

### 🥈 Niveau Intermédiaire  
- [ ] Faire passer tous les tests d'intégration
- [ ] Ajouter un nouveau endpoint API avec ses tests
- [ ] Créer des tests pour les cas d'erreur

### 🥇 Niveau Avancé
- [ ] Faire passer tous les tests E2E Cypress
- [ ] Ajouter un nouveau scénario de test complexe
- [ ] Implémenter une nouvelle fonctionnalité avec TDD

## 🛠️ Commandes Utiles

```bash
# Développement
npm run dev              # Démarrer l'application
npm run stop             # Arrêter l'application

# Tests
npm test                 # Tests unitaires
npm run test:watch       # Tests en mode watch
npm run test:integration # Tests d'intégration
npm run test:e2e         # Tests E2E headless
npm run cypress:open     # Interface Cypress

# Docker
docker-compose up -d     # Démarrer les conteneurs
docker-compose down      # Arrêter les conteneurs
docker-compose logs      # Voir les logs
```

## 🐛 Dépannage

### L'application ne démarre pas
```bash
# Vérifier les conteneurs
docker-compose ps

# Reconstruire les images
docker-compose up --build

# Voir les logs
docker-compose logs backend
docker-compose logs frontend
```

### Les tests ne passent pas
```bash
# Vérifier que l'API fonctionne
curl http://localhost:3001/api/creatures

# Relancer les tests en mode verbose
cd backend && npm test -- --verbose

# Pour Cypress, vérifier que l'app est accessible
curl http://localhost:8080
```

### Problèmes de ports
Si les ports 3001 ou 8080 sont occupés, modifier le `docker-compose.yml` :
```yaml
ports:
  - "3002:3001"  # backend sur port 3002
  - "8081:80"    # frontend sur port 8081
```

## 📚 Concepts Clés ( demande a ton poto l'ai )

### Tests Unitaires
- **Arrange, Act, Assert** pattern
- **Mocking** et isolation
- **Test-driven development (TDD)**
- **Coverage** de code

### Tests d'Intégration
- **API Testing** avec Supertest
- **HTTP status codes**
- **Request/Response** validation
- **Database state** management

### Tests End-to-End
- **User scenarios** simulation
- **DOM interaction** testing
- **Cross-browser** compatibility
- **Visual regression** detection

## 🎉 Défis Bonus

1. **Ajouter des types de créatures** : Implémentez des types avec des bonus/malus
2. **Système d'expérience** : Les créatures gagnent de l'XP après les combats
3. **Arène en temps réel** : WebSocket pour des combats multi-joueurs
4. **Tests de performance** : Ajoutez des tests de charge avec Artillery
5. **CI/CD Pipeline** : Configurez GitHub Actions pour les tests automatiques

## 📖 La doc pour les létrés 

- [Documentation Jest](https://jestjs.io/docs/getting-started)
- [Documentation Cypress](https://docs.cypress.io/guides/overview/why-cypress)
- [Supertest Guide](https://github.com/visionmedia/supertest)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [git actions] (https://docs.github.com/en/actions)

---
