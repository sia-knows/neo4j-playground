const DB_USER = process.env.DB_USER || "neo4j";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";
const DB_URI = process.env.DB_URI || "bolt://localhost:7687";

export { DB_USER, DB_PASSWORD, DB_URI };
