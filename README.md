# Installation

Requirements
- Node.js 20.x.x   
- Postgres 15.x

Run this in the project's root directory
```bash
$ npm install
```

Create a .env file in the root directory with the contents
```bash
# development
NODE_ENV = dev

# production
NODE_ENV = prod
```

Create a config json file. Add properties you want changed from config/default.json. Omitted values will default automatically.
```bash
# development
config/env/dev.json

# production
config/env/prod.json

# test
config/env/test.json
```

&nbsp;





# Client

In the /client/ folder
```bash
# development
$ npm install

# production
$ npm install --omit=dev
```

Production build
```bash
$ npm run build
```

### Running the app

```bash
# development
$ npm start

# watch mode
$ npm run start:dev
```

### Running with PM2

```bash
# start
$ npm run pm2:start

# restart
$ npm run pm2:restart

# stop
$ npm run pm2:stop

# logs
$ npm run pm2:logs
```

&nbsp;





# Server

In the /server/ folder
```bash
# development
$ npm install

# production
$ npm install --omit=dev
```

Production build
```bash
$ npm run build
```

### Running the app

```bash
# development
$ npm start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Running with PM2

```bash
# start
$ npm run pm2:start

# restart
$ npm run pm2:restart

# stop
$ npm run pm2:stop

# logs
$ npm run pm2:logs
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

&nbsp;





# Proxy

This component is meant only for assistance in development. It proxies requests on /api to the nest backend server, and all other requests to the next frontend server. In production environments this job should be handled by nginx (or equivalent).

In the /proxy/ folder
```bash
# development
$ npm install
```

### Running the app

```bash
# development
$ npm start
```