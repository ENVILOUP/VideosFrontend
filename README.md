# Enviloup Frontend

This is the frontend project for **Enviloup**, built with [Next.js](https://nextjs.org/).

## 🛠️ Requirements

- [bun](https://bun.sh/)
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)

---

## 🚀 Getting Started Local

To get the project up and running locally, follow the steps below.

---

### 1. Install Dependencies

You can use any of the following package managers:

```bash
bun install
```

### 2. Run the Development Server (local)

```bash
bun dev
```

Once running, open http://localhost:3000 in your browser to view the application.

## Getting Stated Docker

### Development

To start application in dev mode use:
```bash
docker compose up -d
```

Once running, open http://localhost:3000 in your browser to view the application.

### Production

To start application in prod mode use:
```bash
docker compose -f docker-compose.yaml up -d
```

Once running, open http://localhost:8085 in your browser to view the application.