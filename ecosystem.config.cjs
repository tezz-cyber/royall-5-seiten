module.exports = {
  apps: [
    {
      name: "royall-5-seiten",
      script: "./dist/server/entry.mjs",
      cwd: "/var/www/royall1-ssd.de/app",
      env: {
        HOST: "127.0.0.1",
        PORT: 4321,
        NODE_ENV: "production",
        SMTP_HOST: "smtp.example.com",
        SMTP_PORT: "587",
        SMTP_USER: "info@royall-example.de",
        SMTP_PASS: "changeme",
        CONTACT_RECEIVER: "info@royall-example.de",
      },
    },
  ],
};
