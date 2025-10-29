const mysql = require('mysql2/promise');
const { config } = require('../../config/config');

async function runQuery(queryKey, params = []) {
  const queries = require('../../data/queries.json');
  const query = queries[queryKey];
  if (!query) throw new Error(`Query key not found: ${queryKey}`);
  const conn = await mysql.createConnection(config.db);
  const [rows] = await conn.execute(query, params);
  await conn.end();
  return rows;
}

module.exports = { runQuery };