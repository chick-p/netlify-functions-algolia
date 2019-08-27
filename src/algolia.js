'use strict';

require('dotenv').config();
const rp = require('request-promise');

const APP_ID = process.env.APP_ID;
const API_KEY = process.env.ADMIN_API_KEY;

const algoliasearch = require('algoliasearch');

const createResponse = (status, body) => {
  return {
    headers: {
      'content-type': 'application/json; charset=utf-8'
    },
    statusCode: status,
    body: JSON.stringify(body)
  };
}

exports.handler = async (event, context, callback) => {
  if (!event.httpMethod === ('GET' || 'POST')) {
    callback(null, createResponse(503, {
      error: 'Method not allowed'
    }));
  }

  const indexName = event.queryStringParameters.name;
  const indexPath = event.queryStringParameters.path;
  if (!indexName || !indexPath ) {
    callback(null, createResponse(503, {
      error: 'Require index and path'
    }));
  }

  try {
    const client = algoliasearch(APP_ID, API_KEY);
    const index = client.initIndex(indexName);
    const content = await rp(indexPath);
    const resp = await index.addObjects(JSON.parse(content));
    callback(null, createResponse(200, {
      message: resp
    }));
  } catch (e) {
    callback(null, createResponse(503, {
      error: e
    }));
  }
};
