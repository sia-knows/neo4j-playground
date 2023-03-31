import { Application, Request, Response } from "express";

import { DB_PASSWORD, DB_URI, DB_USER } from "../config";
import { CypherQueryBuilder } from "../neo4j/CyperQueryBuilder";
import { Neo4jConnection } from "../neo4j/Neo4jConnection";

export const loadApiEndpoints = (app: Application): void => {
  const neo4jSession = Neo4jConnection.create(DB_URI, DB_USER, DB_PASSWORD);

  app.get("/api/check", async (req: Request, res: Response) => {
    return res.status(200).send({ msg: "API is working fine" });
  });

  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      // This should got inside the use case but for the sake of simplicity, we will leave it here for now
      const id = req.params.id;
      const nodeKey = "u";
      const labels = ["User"];
      const filterObject = { id } as unknown as Record<string, unknown>;

      const query = new CypherQueryBuilder(nodeKey, labels, filterObject);

      const result = await neo4jSession.run(query.buildReadQuery());
      const records = result.records.map((record) => record.toObject());

      return res.status(200).send({ data: records });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Something happend" });
    }
  });

  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const { id, name } = req.body;
      const nodeKey = "u";
      const labels = ["User"];
      const properties = { id, name };

      const query = new CypherQueryBuilder(nodeKey, labels, properties);

      await neo4jSession.run(query.buildCreateQuery());

      return res.status(200).send({ msg: "User created" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Something happend" });
    }
  });
};
