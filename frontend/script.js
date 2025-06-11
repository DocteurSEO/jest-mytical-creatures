class CreatureGame {
    constructor() {
        this.apiUrl = 'http://localhost:3001/api';
        this.creatures = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadCreatures();
    }

    bindEvents() {
        document.getElementById('load-creatures').addEventListener('click', () => this.loadCreatures());
        document.getElementById('reset-game').addEventListener('click', () => this.resetGame());
        document.getElementById('battle-btn').addEventListener('click', () => this.startBattle());
        document.getElementById('creature-form').addEventListener('submit', (e) => this.createCreature(e));
        
        document.getElementById('attacker-select').addEventListener('change', () => this.updateBattleButton());
        document.getElementById('defender-select').addEventListener('change', () => this.updateBattleButton());
    }

    async loadCreatures() {
        try {
            this.showLoading('creatures-list');
            const response = await fetch(`${this.apiUrl}/creatures`);
            const data = await response.json();
            
            if (data.success) {
                this.creatures = data.data;
                this.displayCreatures();
                this.updateBattleSelects();
            } else {
                this.showError('Erreur lors du chargement des créatures');
            }
        } catch (error) {
            this.showError('Impossible de se connecter au serveur');
            console.error('Erreur:', error);
        }
    }

    displayCreatures() {
        const container = document.getElementById('creatures-list');
        
        if (this.creatures.length === 0) {
            container.innerHTML = '<p class="loading">Aucune créature trouvée</p>';
            return;
        }

        container.innerHTML = this.creatures.map(creature => `
            <div class="creature-card ${!creature.isAlive ? 'dead' : ''}" data-creature-id="${creature.id}">
                <h3>${creature.name}</h3>
                <span class="creature-type">${creature.type}</span>
                <div class="creature-stats">
                    <div class="stat">
                        <span>⚡ Puissance:</span>
                        <strong>${creature.power}</strong>
                    </div>
                    <div class="stat">
                        <span>💚 Santé:</span>
                        <strong>${creature.health}/${creature.maxHealth}</strong>
                    </div>
                </div>
                <div class="health-bar">
                    <div class="health-fill ${creature.health < creature.maxHealth * 0.3 ? 'low' : ''}" 
                         style="width: ${(creature.health / creature.maxHealth) * 100}%"></div>
                </div>
                ${creature.isAlive ? 
                    `<button class="btn btn-secondary" onclick="game.healCreature('${creature.id}', 20)" style="margin-top: 1rem; width: 100%;">🩹 Soigner (+20)</button>` : 
                    '<p style="text-align: center; margin-top: 1rem; color: #f44336;">💀 Morte</p>'
                }
            </div>
        `).join('');
    }

    updateBattleSelects() {
        const aliveCreatures = this.creatures.filter(c => c.isAlive);
        const attackerSelect = document.getElementById('attacker-select');
        const defenderSelect = document.getElementById('defender-select');

        const options = aliveCreatures.map(creature => 
            `<option value="${creature.id}">${creature.name} (${creature.health}/${creature.maxHealth} PV)</option>`
        ).join('');

        attackerSelect.innerHTML = '<option value="">Choisir une créature</option>' + options;
        defenderSelect.innerHTML = '<option value="">Choisir une créature</option>' + options;
        
        this.updateBattleButton();
    }

    updateBattleButton() {
        const attackerId = document.getElementById('attacker-select').value;
        const defenderId = document.getElementById('defender-select').value;
        const battleBtn = document.getElementById('battle-btn');
        
        battleBtn.disabled = !attackerId || !defenderId || attackerId === defenderId;
    }

    async startBattle() {
        const attackerId = document.getElementById('attacker-select').value;
        const defenderId = document.getElementById('defender-select').value;

        try {
            const response = await fetch(`${this.apiUrl}/battle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    attacker_id: attackerId,
                    defender_id: defenderId
                })
            });

            const data = await response.json();
            
            if (data.success) {
                this.displayBattleResult(data.data);
                await this.loadCreatures(); // Recharger pour mettre à jour les stats
            } else {
                this.showBattleError(data.message);
            }
        } catch (error) {
            this.showBattleError('Erreur lors du combat');
            console.error('Erreur:', error);
        }
    }

    displayBattleResult(result) {
        const resultDiv = document.getElementById('battle-result');
        resultDiv.className = 'battle-result show success';
        resultDiv.innerHTML = `
            <h3>⚔️ Résultat du Combat</h3>
            <p><strong>${result.message}</strong></p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                <div>
                    <h4>🗡️ ${result.attacker.name}</h4>
                    <p>Santé: ${result.attacker.health}/${result.attacker.maxHealth}</p>
                    <p>Statut: ${result.attacker.isAlive ? '✅ Vivant' : '💀 Mort'}</p>
                </div>
                <div>
                    <h4>🛡️ ${result.defender.name}</h4>
                    <p>Santé: ${result.defender.health}/${result.defender.maxHealth}</p>
                    <p>Statut: ${result.defender.isAlive ? '✅ Vivant' : '💀 Mort'}</p>
                </div>
            </div>
        `;
    }

    showBattleError(message) {
        const resultDiv = document.getElementById('battle-result');
        resultDiv.className = 'battle-result show error';
        resultDiv.innerHTML = `
            <h3>❌ Erreur de Combat</h3>
            <p>${message}</p>
        `;
    }

    async createCreature(event) {
        event.preventDefault();
        
        const name = document.getElementById('creature-name').value;
        const type = document.getElementById('creature-type').value;
        const power = parseInt(document.getElementById('creature-power').value);
        const health = parseInt(document.getElementById('creature-health').value);

        try {
            const response = await fetch(`${this.apiUrl}/creatures`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, type, power, health })
            });

            const data = await response.json();
            
            if (data.success) {
                document.getElementById('creature-form').reset();
                await this.loadCreatures();
                this.showSuccess('Créature créée avec succès !');
            } else {
                this.showError(data.message);
            }
        } catch (error) {
            this.showError('Erreur lors de la création de la créature');
            console.error('Erreur:', error);
        }
    }

    async healCreature(creatureId, amount) {
        try {
            const response = await fetch(`${this.apiUrl}/creatures/${creatureId}/heal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount })
            });

            const data = await response.json();
            
            if (data.success) {
                await this.loadCreatures();
                this.showSuccess('Créature soignée !');
            } else {
                this.showError(data.message);
            }
        } catch (error) {
            this.showError('Erreur lors du soin');
            console.error('Erreur:', error);
        }
    }

    async resetGame() {
        try {
            const response = await fetch(`${this.apiUrl}/reset`, {
                method: 'POST'
            });

            const data = await response.json();
            
            if (data.success) {
                await this.loadCreatures();
                this.showSuccess('Jeu réinitialisé !');
                document.getElementById('battle-result').classList.remove('show');
            } else {
                this.showError('Erreur lors de la réinitialisation');
            }
        } catch (error) {
            this.showError('Erreur lors de la réinitialisation');
            console.error('Erreur:', error);
        }
    }

    showLoading(containerId) {
        document.getElementById(containerId).innerHTML = '<p class="loading">Chargement...</p>';
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showMessage(message, type) {
        const existing = document.querySelector('.temporary-message');
        if (existing) {
            existing.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `temporary-message ${type === 'error' ? 'error-message' : 'success-message'}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: bold;
            animation: slideIn 0.3s ease;
        `;

        if (type === 'success') {
            messageDiv.style.background = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
        }

        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// Initialiser le jeu quand la page est chargée
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new CreatureGame();
});

// Ajouter les styles pour les messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .success-message {
        background: #d4edda !important;
        color: #155724 !important;
        border: 1px solid #c3e6cb !important;
    }
`;
document.head.appendChild(style);