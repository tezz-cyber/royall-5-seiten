module.exports = {
  apps: [
    {
      name: "royall-5-seiten",
      script: "start.mjs",
      cwd: "/var/www/5.royall-ssd.de/web/app",
      env: {
        HOST: "127.0.0.1",
        PORT: 4321,
        NODE_ENV: "production"
      },
    },
  ],
};
