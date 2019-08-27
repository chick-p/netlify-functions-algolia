# README

This repository a netlify function that inserts index objects to algolia from your url of json data.

## How to development
To run the examples locally, here’s what you’ll need:

1. Install modules
    ```
    $ cd netlify-functions-algolia
    $ npm install
    ```

2. create `.env` file and set environment variables.
    ```
    APP_ID=<Algolia App ID>
    ADMIN_API_KEY=<Algolia Admin API Key>
    ```

3. Run Server
    ```
    $ npm run serve
    ```
    This will start the netlify-lambda server on http://localhost:9000.
    This function would be called from http://localhost:9000/algolia?name={ALGOLIA_INDEX_NAME}&url={JSON_URL_PATH}

## Delopy
1. In the Netlify web interface, go to [Settings] > [Build & deploy].
2. Set [Environment variables] in [Enviroment] section as the follows:

    |Parameter |Value
    |:--|:--
    |APP_ID |Algolia App ID
    |ADMIN_API_KEY |Algolia Admin API Key
