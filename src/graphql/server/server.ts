import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "../schemas";
import { setServer } from "./shutdown";

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  schema,
});

// Passes the server instance for shutdown handling
setServer(server);

const flight = async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT as number },
    });
    console.log(`🚀  Server took off at: ${url}`);
  } catch (e) {
    throw new Error(`Server failed to take off: ${e}`);
  }
};

export default flight;
