FROM node:18

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (production + dev pour les tests)
RUN npm install

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3001

# Commande de démarrage
CMD ["npm", "start"]