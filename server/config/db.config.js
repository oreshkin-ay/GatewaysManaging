const { DB_HOST, DB_PORT, DB_NAME } = process.env;

module.exports = {
  url: `mongodb://${DB_HOST || "localhost"}:${DB_PORT || 27017}/${
    DB_NAME || "managing_gateways_db"
  }`,
};
