# neo4j-playground

Neo4J Minimum Viable Tests to check the viability of working with Neo4J, typescript and python.

## Getting started

1. Launch the [neo4j db locally](#using-the-neo4j-db-locally)
2. Run the app using TS/Express

```sh
## Install the modules
npm i
## Run dev mode
npm run dev
## Run tests
npm run test
```

3. Run the app using Python & Flask

```sh
# Active the virtual environment if not created already
python -m venv <name>

# Activate the virtual env
source <name>/bin/activate

# Install dependencies using pip
pip install -r requirements.txt

# Copy .env variables
cp .env.example .env
```

### Using the Neo4j db locally

The Neo4j DB is created using the official neo4j Docker image. It exposes ports **7474** and **7687** for Neo4j's HTTP and Bolt protocols, respectively, and sets the NEO4J_AUTH environment variable to set the initial username and password to **neo4j/password**. The NEO4J_ACCEPT_LICENSE_AGREEMENT environment variable is also set to "yes" to accept the Neo4j license agreement.

You can start the Neo4j instance by running the following command in the directory where the docker-compose.yml file is located:

```sh
# This will start the neo4j service and you should be able to access it by navigating to http://localhost:7474 in your web browser.
docker-compose up -d neo4jdb
```

You can now go to _http://localhost:7474_ and play with your database:

- Run cypher queries
- Create nodes
- Visualize data, etc

### Bolt vs HTTP

Bolt is a binary, low-overhead, high-performance protocol that is specifically designed for interacting with Neo4j. It is optimized for use cases where low latency and high throughput are important, such as real-time applications and large-scale data processing. Bolt operates over a single, persistent connection between the client and server, allowing for efficient communication and reduced network overhead. HTTP is a more flexible, text-based protocol that is commonly used for web-based communication.

Using the neo4j driver you can use both with express or any other framework.
