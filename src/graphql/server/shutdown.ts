import { ApolloServer } from "@apollo/server";

let server: ApolloServer;

export const setServer = (serverInstance: ApolloServer) => {
  server = serverInstance;
};

export const gracefulShutdown = async () => {
  console.log(`Gracefully landing...`);
  await server.stop();
  process.exit(0);
};
