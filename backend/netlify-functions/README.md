# Netlify functions

## Let's get started

Install the dependencies

```bash
npm install
```

Create `.evn` file in root of this folder and fill variables

```bash
DB_CONNECTION_STRING=
```

Start lambda functions (will be available under `http://localhost:9000/`)

```bash
npm run serve
```

## Lambda functions

The lambda functions are in `./src/functions` folder.

1. The route that creates new cactus in the db. `POST /cactus`
2. The route that deletes the cactus from the db. `DELETE /cactus`
3. The route that returns all cactuses which are available in the db. `GET /cactus`
4. The route that modifies the cactus in the db. `PUT /cactus`
