export class CypherQueryBuilder {
  private readonly labels: string[];
  private nodeKey: string;
  private readonly properties: Record<string, unknown>;

  constructor(
    nodeKey: string,
    labels: string[],
    properties: Record<string, unknown>
  ) {
    this.labels = labels;
    this.properties = properties;
    this.nodeKey = nodeKey;
  }

  public buildCreateQuery(): string {
    const labelsClause = this.getLabelMatchClause();
    const propertiesClause = this.objectToCypher(this.properties);
    return `MERGE (${this.nodeKey}${labelsClause} ${propertiesClause}) RETURN ${this.nodeKey}`;
  }

  public buildUpdateQuery(): string {
    const setClause = Object.entries(this.properties)
      .map(([key, value]) => `node.${key} = ${JSON.stringify(value)}`)
      .join(", ");
    return `MATCH (${
      this.nodeKey
    }${this.getLabelMatchClause()}) SET ${setClause} RETURN ${this.nodeKey}`;
  }

  public buildDeleteQuery(): string {
    return `MATCH (${this.nodeKey}${this.getLabelMatchClause()}) DELETE ${
      this.nodeKey
    }`;
  }

  public buildReadQuery(): string {
    return `MATCH (${this.nodeKey}${this.getLabelMatchClause()}) RETURN ${
      this.nodeKey
    }`;
  }

  private getLabelMatchClause(): string {
    return this.labels.length > 0 ? `:${this.labels.join(":")}` : "";
  }

  private objectToCypher(obj: Record<string, unknown>): string {
    const properties = Object.entries(obj)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join(", ");
    return `{${properties}}`;
  }
}
