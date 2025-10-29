const env = process.env.ENV || "dev";
const config = require('./environment.json')[env];
module.exports = { config };