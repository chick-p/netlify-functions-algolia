'use strict';

require('dotenv').config();
const rp = require('request-promise');

const APP_ID = process.env.APP_ID;
const API_KEY = process.env.ADMIN_API_KEY;

const algoliasearch = require('algoliasearch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 503,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({error: 'Method Not Allowed'})
    }
  }
  const indexName = event.queryStringParameters.name;
  const indexPath = event.queryStringParameters.path;
  console.log(indexPath);

  if (!indexName || !indexPath ) {
    return {
      statusCode: 503,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({error: 'Require \'index\'(index name) and \'path\'(index json path)'})
    }
  }

  try {
    const client = algoliasearch(APP_ID, API_KEY);
    const index = client.initIndex(indexName);

    const content = await rp(indexPath);
    const resp = await index.addObjects(JSON.parse(content));
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({message: resp})
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: 503,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({error: e})
    }
  }
};
