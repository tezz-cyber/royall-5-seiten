# royall-5-seiten (Basisversion, 2 Sparten)

## Git-Initialisierung

```
cd royall-5-seiten
git init
git add .
git commit -m "Initial commit: royall-5-seiten (Basisversion, 2 Sparten)"
git branch -M main
git remote add origin git@github.com:DEIN-USER/royall-5-seiten.git
git push -u origin main
```

## GitHub Secrets für dieses Repo

| Secret Name       | Wert                                  |
|--------------------|----------------------------------------|
| DEPLOY_HOST        | 123.456.789.123                        |
| DEPLOY_USER        | root                                   |
| DEPLOY_SSH_KEY     | Privater SSH-Key                       |
| DEPLOY_PATH        | /var/www/royall1.meinedomain.com/app                                 |

## Server-Vorbereitung (einmalig)

```
mkdir -p /var/www/royall1.meinedomain.com/app
```

Node.js + PM2 installieren, nginx Reverse-Proxy einrichten: siehe
`nginx-reverse-proxy-snippet.conf` und allgemeine Hinweise in DEPLOY-README.md.
