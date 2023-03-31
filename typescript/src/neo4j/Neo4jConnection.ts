import neo4j, { Driver, Session } from "neo4j-driver";

export class Neo4jConnection {
  private static driver: Driver;

  static create(uri: string, user: string, password: string): Session {
    if (!this.driver) {
      this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
        maxConnectionPoolSize: 100,
        maxConnectionLifetime: 30 * 60,
        connectionAcquisitionTimeout: 2 * 60
      });
    }
    return this.driver.session();
  }
}
