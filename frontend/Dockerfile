FROM nginx:alpine

# Copier les fichiers statiques
COPY . /usr/share/nginx/html

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port
EXPOSE 80

# Nginx se lance automatiquement