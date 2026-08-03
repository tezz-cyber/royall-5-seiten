#!/bin/bash
# Lokal ausführen: baut das Projekt und lädt es per rsync auf den Server hoch.
set -e

SERVER="root@123.456.789.123"
REMOTE_DIR="/var/www/royall.meinedomain.com/app"

echo "==> Baue Astro-Projekt..."
npm run build

echo "==> Lade Dateien auf den Server hoch..."
rsync -avz --delete \
  --exclude node_modules \
  --exclude .git \
  ./ "$SERVER:$REMOTE_DIR/"

echo "==> Installiere Abhängigkeiten auf dem Server und starte PM2 neu..."
ssh "$SERVER" "cd $REMOTE_DIR && npm install --omit=dev && pm2 startOrReload ecosystem.config.cjs && pm2 save"

echo "==> Fertig. Website läuft über PM2 + nginx Reverse-Proxy."
