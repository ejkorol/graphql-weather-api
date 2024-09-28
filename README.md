# Lush Technical Challenge

An Apollo GraphQL server written in TypeScript.

This API utilizes the **Pothos** schema builder for type safety, **Axios** for requests, **Open Meteo** API for fetching weather data and **country-city-state** for geographical coordinates.

Additionally, it utilizes [**country-city-state**](https://www.npmjs.com/package/country-state-city) to fetch city longitude and latitudes for ease of use.

> ### Frontend
>
> The frontend for this repository can be found here
>
> [**graphql-weather-client**](https://www.github.com/ejkorol/graphql-weather-client)

## Features

- [**GraphQL**](https://graphql.org/)
- [**Apollo GraphQL Server**](https://www.apollographql.com/)
- [**Axios**](https://axios-http.com/)
- [**country-city-state**](https://github.com/harpreetkhalsagtbit/country-state-city)

## Architecture

```bash
.
├── src/
│   │  
│   ├── graphql/
│   │   │ 
│   │   ├── schemas/     // pothos schemas
│   │   └── server/      // apollo server instance
│   │
│   ├── lib/             // shared 3rd party libraries
│   ├── types/           // typscript types
│   ├── utils/           // utils and helper functions
│   │  
│   └── index.ts         // entry point
│ 
├── .gitignore
├── .env.sample
├── .env
├── README.md
├── nodemon.json
└── tsconfig.json
```

## Installation

1. Clone the Repository:
    
    ```bash
    $ git clone https://www.github.com/ejkorol/graphql-weather-api && cd graphql-weather-api
    ```

2. Install dependencies:

    ```bash
    $ npm install
    ```

3. Transfer `.env.sample` variables into `.env`:

    ```bash
    $ touch .env && cat .env.sample > .env
    ```

4. Spin up the dev server:

    ```bash
    $ npm run dev
    ```

## Startup

* Development server:
    
    ```bash
    $ npm run dev
    ```

* Building:

    ```bash
    $ npm run build
    ```

* Running compiled server:

    ```bash
    $ npm run start
    ```

---

_Author: Jason Korol_
