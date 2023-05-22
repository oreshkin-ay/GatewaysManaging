const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// module.exports = {
//   url: "mongodb://127.0.0.1:27017/managing_gateways_db",
// };
module.exports = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
};
